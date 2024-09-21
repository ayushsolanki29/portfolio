"use client";
import React, { useEffect, useState } from "react";
import PageHeader from "../_components/FileHeader";
import { Button } from "@/components/ui/button";
import axios from "axios";
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
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const TechStacksPage = () => {
  return (
    <div className="container flex flex-col h-full">
      <div className="flex justify-between">
        <PageHeader>Tech Stacks</PageHeader>
        <Link href={"/admin/tech-stacks/new"}>
          <Button size={"sm"} variant={"default"}>
            Add New Language
          </Button>
        </Link>
      </div>
      <div className="mt-8">
        <TechStackTable />
      </div>
    </div>
  );
};

export default TechStacksPage;

const TechStackTable = () => {
  const [techStacks, setTechStacks] = useState<any[]>([]); // Define correct type

  useEffect(() => {
    const fetchTechStacks = async () => {
      try {
        const response = await axios.get("/api/tech-stacks/get");
        if (response.data.success) {
          setTechStacks(response.data.techStacks);
        } else {
          console.error("Error fetching tech stacks:", response.data.message);
        }
      } catch (error: any) {
        console.error("Error fetching tech stacks:", error.message);
      }
    };

    fetchTechStacks();
  }, []);

  if (techStacks.length === 0) return <p>No Language Found!</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {techStacks.map((techstack) => (
          <TableRow key={techstack.id}>
            <TableCell>
              <Link href={`/project/${techstack.id}`}>
                <Image
                  height={50}
                  width={50}
                  className="object-fill"
                  src={techstack.image}
                  alt={techstack.techstack}
                />
              </Link>
            </TableCell>
            <TableCell>{techstack.name}</TableCell>
            <TableCell>{techstack.role}</TableCell>

            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href={`/admin/tech-stacks/${techstack.id}/edit`}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/admin/tech-stacks/${techstack.id}/delete`}>
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
