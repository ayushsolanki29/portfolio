import { connectToDatabase } from "@/lib/db";
import Contact from "@/models/Contact";

export async function GET() {
  await connectToDatabase();
  try {
    const contactData = await Contact.find({}).sort({ createdAt: "desc" });
    return Response.json({ success: true, contactData });
  } catch (error: any) {
    console.error(`Error fetching techStacks: ${error.message}`);
    return Response.json({ success: false, message: error.message });
  }
}
