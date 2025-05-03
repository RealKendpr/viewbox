import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { deleteManyPages } from "../api/_utils/deletePage";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    deleteUser: {
      enabled: true,
      afterDelete: async (user) => {
        await deleteManyPages(user.id);
      },
    },
    additionalFields: {
      userTheme: {
        type: "string",
        required: true,
        defaultValue: "light",
      },
    },
  },
});
