import React from "react";
import PageHeader from "../_components/FileHeader";
import { Button } from "@/components/ui/button";
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
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import TechStack from "@/models/TechStack";
const TechStacksPage = () => {
  return (
    <div className="container flex flex-col h-screen">
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

async function TechStackTable() {
  const techStaks = await TechStack.find({})
    .select({ name: 1, image: 1, role: 1 })
    .sort({ createdAt: "desc" });
  if (techStaks.length === 0) return <p>No Laguage Found!!</p>;

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
        {techStaks.map((techstack: any) => (
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
}
