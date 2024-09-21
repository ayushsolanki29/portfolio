"use client";
import React, { useEffect, useState } from "react";
import PageHeader from "../_components/FileHeader";
import parse from "html-react-parser";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Info, MoreVertical } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

const ContactPage = () => {
  return (
    <div className="container flex flex-col h-screen">
      <div className="flex justify-start">
        <PageHeader>Contact Submissions</PageHeader>
      </div>
      <div className="mt-8">
        <ContactTable />
      </div>
    </div>
  );
};

const ContactTable = () => {
  const [contact, setContact] = useState<any[]>([]); // Define correct type

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get("/api/contact/get");
        if (response.data.success) {
          setContact(response.data.contactData);
        } else {
          console.error("Error fetching contact:", response.data.message);
        }
      } catch (error: any) {
        console.error("Error fetching contact:", error.message);
      }
    };

    fetchContact();
  }, []);

  if (contact.length === 0) return <p>No Contact Submissions Found!!</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Query</TableHead>
          <TableHead>Other</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contact.map((contactItem: any) => (
          <TableRow key={contactItem.id}>
            <TableCell>{contactItem.name}</TableCell>
            <TableCell>{contactItem.email}</TableCell>
            <TableCell>{contactItem.query}</TableCell>
            <TableCell>{contactItem.other}</TableCell>
            <TableCell className="flex gap-2 items-center justify-center">
              <Popover>
                <PopoverTrigger>
                  <Info className="size-3" />
                </PopoverTrigger>
                <PopoverContent className="max-h-48 overflow-auto p-2">
                  <div className="text-xs">{parse(contactItem.message)}</div>
                </PopoverContent>
              </Popover>
              <div className="text-xs truncate max-w-xs">
                {contactItem.message.length > 10
                  ? `${contactItem.message.substring(0, 10)}...`
                  : contactItem.message}
              </div>
            </TableCell>
            <TableCell>
              {format(new Date(contactItem.createdAt), "dd-MMM-yyyy hh:mm a")}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href={`/admin/contact/${contactItem.id}/delete`}>
                      Delete
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ContactPage;
