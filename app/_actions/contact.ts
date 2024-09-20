"use server";
import { connectToDatabase } from "@/lib/db";

import { redirect } from "next/navigation";
import Contact from "@/models/Contact";
import { z } from "zod";
const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  query: z.string().min(1, { message: "Please select a query" }),
  message: z.string().min(1, { message: "Message is required" }),
  other: z.string().optional(),
});

export async function submitContactForm(
  prevState: unknown,
  formData: FormData
) {
  connectToDatabase();
  // Validate the form data using the Zod schema
  const result = contactFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success) {
    // Return validation errors
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  try {
    // Insert the form data into the database
    const contactForm = await Contact.create({
      name: data.name,
      email: data.email,
      message: data.message,
      query: data.query,
      other: data?.other,
    });

    // Check if the data was successfully inserted
    if (contactForm) {
      return true;
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error saving contact form:", error);

    // Optionally, return an error response to be handled by the calling function
    return { error: "Failed to submit the contact form. Please try again." };
  }
}
