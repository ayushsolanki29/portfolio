"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitContactForm } from "@/app/_actions/contact";
import toast from "react-hot-toast";

// Define the Zod schema
const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  query: z.string().min(1, { message: "Please select a query" }),
  message: z.string().min(1, { message: "Message is required" }),
  other: z.string().optional(),
});

type ContactForm = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isShow, setIsShow] = useState(false); // Show state
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      query: "",
      message: "",
      other: "",
    },
  });

  const onSubmit: SubmitHandler<ContactForm> = async (data) => {
    setIsLoading(true);
    try {
      // Create a new FormData object
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("message", data.message);
      formData.append("query", data.query);
      if (data.other) formData.append("other", data.other);

      // Call the server action with prevState (optional) and formData
      const result: any = await submitContactForm(null, formData);

      // Handle the response
      if (!result || result.error) {
        toast.error("Failed to submit the contact form. Please try again.");
      } else {
        toast.success("Contact form saved successfully!");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An error occurred during form submission.");
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };

  return (
    <div className="w-full lg:w-3/4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel className="text-white">Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Enter your name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <>
                <FormItem className="mb-2">
                  <FormLabel className="text-white">Select Query</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setIsShow(value === "other");
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Your Query" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select Your Query</SelectLabel>
                        <SelectItem value="developer">
                          Contact Developer
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          {isShow && (
            <FormField
              control={form.control}
              name="other"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel className="text-white">Other</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Write here Your Query"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel className="text-white">Message</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={4} placeholder="Your message" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-4" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
