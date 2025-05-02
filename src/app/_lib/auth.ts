import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import PageModel from "@/_lib/mongodb/models/PageModel";
import { deletePage } from "../api/_utils/deletePage";
import { PageDocumentType } from "@/types/PageTypes";

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
        const pageToDelete: PageDocumentType | null =
          await PageModel.findOneAndDelete({ userId: user.id });

        if (!pageToDelete) return;

        await deletePage({ userId: user.id }, pageToDelete);
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
