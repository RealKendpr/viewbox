import { connectDB } from "./mongodb";
import UserModel from "./models/User";

export async function getUser(username: string) {
  try {
    await connectDB();
    const user = await UserModel.findOne({ username });

    return user;
  } catch (error) {
    console.error("Failed to fetch user", error);
    throw new Error("Failed to fetch user.");
  }
}
