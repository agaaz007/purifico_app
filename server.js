import express from "express";
import AWS from "aws-sdk";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://ec2-13-51-206-194.eu-north-1.compute.amazonaws.com:3000/",
  })
);
app.use(bodyParser.json());

// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Subscribers";

// Ensure the 'Subscribers' table exists
const ensureTableExists = async () => {
  const dynamodb = new AWS.DynamoDB();
  const params = {
    TableName: TABLE_NAME,
    KeySchema: [
      { AttributeName: "email", KeyType: "HASH" }, // Partition key
    ],
    AttributeDefinitions: [{ AttributeName: "email", AttributeType: "S" }],
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

// Add the /api/subscribe route
app.post("/api/subscribe", async (req, res) => {
  const { email, name } = req.body;
  const params = {
    TableName: TABLE_NAME,
    Item: {
      email: email,
      name: name,
    },
  };

  try {
    await dynamoDb.put(params).promise();
    res.status(200).json({ message: "Subscription successful" });
  } catch (error) {
    console.error("Error subscribing:", error);
    res.status(500).json({ error: "Subscription failed" });
  }
});

// Start the server
app.listen(port, async () => {
  await ensureTableExists();
  console.log(`Server running on http://localhost:${port}`);
});
