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
import axios from "axios";
import toast from "react-hot-toast";

// Define the Zod schema
const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  query: z.string().min(1, { message: "Please select a query" }),
  message: z
    .string()
    .min(10, { message: "Message is atleast 10 Characters Long" })
    .max(500, { message: "Max char limit is 500 characters" }),
  other: z.string().optional(),
});
type ContactForm = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);

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
      const result = await axios.post("/api/contact/send", data);

      if (result.data.success) {
        toast.success("Contact form submitted successfully!");
        form.reset(); // Reset the form after successful submission
      } else {
        toast.error(
          result.data.message || "Failed to submit the contact form."
        );
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
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
                    <SelectItem value="Project Inquiry">Project Inquiry</SelectItem>
<SelectItem value="Contact Developer">Contact Developer</SelectItem>
<SelectItem value="Hire Me">Hire Me</SelectItem>
<SelectItem value="Collaborate on a Project">Collaborate on a Project</SelectItem>
<SelectItem value="Request a Quote">Request a Quote</SelectItem>
<SelectItem value="Feedback or Suggestions">Feedback or Suggestions</SelectItem>
<SelectItem value="Support or Issue">Support or Issue</SelectItem>
<SelectItem value="other">Other</SelectItem>

                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
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
                      placeholder="Write your query here"
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
