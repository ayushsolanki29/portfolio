"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
const LanguageForm = () => {
  const [name, setName] = useState("");
  
  const [role, setRole] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("/api/tech-stacks/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Tech stack added successfully!");
        // Reset form fields
        setName("");
        setRole("");
        setImage("" || null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      console.error("Error adding tech stack:", error);
      toast.error("Error adding tech stack");
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="title">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Language name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Role</Label>
        <Input
          type="text"
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Enter Language role"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input
          type="file"
          onChange={(e) => {
            if (e.target.files) setImage(e.target.files[0]);
          }}
          id="image"
          name="image"
        />
      </div>

      <Button>{loading ? "Saving..." : "Save"} </Button>
    </form>
  );
};

export default LanguageForm;
