import { defineApi } from "@aws-amplify/backend";
import { generateClient } from "@aws-amplify/api";
import { Schema } from "../data/resource";

const client = generateClient<Schema>();

export const api = defineApi({
  routes() {
    this.post("/signup", async (request) => {
      const { name, email } = await request.json();
      try {
        const newSignUp = await client.models.SignUp.create({
          name,
          email,
        });
        return {
          statusCode: 200,
          body: JSON.stringify(newSignUp),
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: "Failed to create sign-up" }),
        };
      }
    });
  },
});
