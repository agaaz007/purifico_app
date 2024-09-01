import express from "express";
import AWS from "aws-sdk";
import cors from "cors";
import bodyParser from "body-parser";
import serverless from "serverless-http";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Configure AWS SDK
AWS.config.update({
  region: "us-east-1", // Update to your region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Set your AWS access key ID
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Set your AWS secret access key
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Subscribers"; // Update to your DynamoDB table name

// Ensure the 'Subscribers' table exists
const ensureTableExists = async () => {
  const dynamodb = new AWS.DynamoDB();
  const params = {
    TableName: TABLE_NAME,
    KeySchema: [
      { AttributeName: "email", KeyType: "HASH" }, // Partition key
    ],
    AttributeDefinitions: [
      { AttributeName: "email", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };

  try {
    await dynamodb.describeTable({ TableName: TABLE_NAME }).promise();
    console.log(`Table ${TABLE_NAME} already exists.`);
  } catch (err) {
    if (err.code === "ResourceNotFoundException") {
      await dynamodb.createTable(params).promise();
      console.log(`Table ${TABLE_NAME} created.`);
    } else {
      console.error("Error describing or creating table:", err);
    }
  }
};

ensureTableExists();

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Purifico API");
});

app.post("/api/subscribe", async (req, res) => {
  const { email, name } = req.body;
  const params = {
    TableName: TABLE_NAME,
    Item: {
      email,
      name: name || "Landing Page",
    },
  };

  try {
    await dynamoDb.put(params).promise();
    console.log("Subscriber added:", params.Item);
    res.status(200).send("Subscription successful");
  } catch (error) {
    console.error("Error adding subscriber:", error);
    res.status(500).send(`Subscription failed: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports.handler = serverless(app);
