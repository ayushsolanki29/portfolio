import { connectToDatabase } from "@/lib/db";
import TechStack from "@/models/TechStack";

export async function GET() {
  await connectToDatabase();
  try {
    const techStacks = await TechStack.find({}).sort({
      createdAt: "desc",
    });
    return Response.json({ success: true, techStacks });
  } catch (error: any) {
    console.error(`Error fetching techStacks: ${error.message}`);
    return Response.json({ success: false, message: error.message });
  }
}
