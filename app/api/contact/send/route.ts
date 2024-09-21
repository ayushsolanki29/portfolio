"use server";

import { connectToDatabase } from "@/lib/db";
import Contact from "@/models/Contact";
import { z } from "zod";

// Define the schema for validating contact form data
const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  query: z.string().min(1, { message: "Please select a query" }),
  message: z.string().min(10, { message: "Message is required" }).max(500, { message: "Max char limit is 500 characters" }),
  other: z.string().optional(),
});

// POST handler for submitting the contact form
export async function POST(request: Request) {
  await connectToDatabase(); // Ensure connection to the database

  const formData = await request.json(); // Get JSON data from the request

  // Validate the form data using the Zod schema
  const result = contactFormSchema.safeParse(formData);

  if (!result.success) {
    // Return validation errors
    return new Response(JSON.stringify({ success: false, errors: result.error.formErrors.fieldErrors }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = result.data;

  try {
    // Insert the validated form data into the database
    const contactForm = await Contact.create({
      name: data.name,
      email: data.email,
      message: data.message,
      query: data.query,
      other: data.other,
    });

    // Check if the data was successfully inserted
    if (contactForm) {
      return new Response(JSON.stringify({ success: true, message: "Message sent successfully!" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error saving contact form:", error);
    return new Response(JSON.stringify({ success: false, message: "Failed to submit the contact form. Please try again." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
