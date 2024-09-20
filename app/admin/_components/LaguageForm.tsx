"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { addTechStacks, updateTechstacks } from "../_actions/Techstacks";
import Image from "next/image";

const LanguageForm = ({ language }: { language?: any | null }) => {
  const [error, action] = useFormState(
    language != null
      ? updateTechstacks.bind(null, language._id)
      : addTechStacks,
    {}
  );
  return (
    <form className="space-y-8" action={action}>
      <div className="space-y-2">
        <Label htmlFor="title">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          defaultValue={language?.name}
          placeholder="Enter Language name"
        />
        {error?.name && <div className="text-red-500">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Role</Label>
        <Input
          type="text"
          id="role"
          name="role"
          defaultValue={language?.role}
          placeholder="Enter Language role"
        />
        {error?.role && <div className="text-red-500">{error.role}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" />
        {error?.image && <div className="text-red-500">{error.image}</div>}
        {language && (
          <div className="flex gap-4">
            <Image
              src={language.image}
              alt={language.name}
              width="100"
              height="100"
            />
          </div>
        )}
      </div>

      <Button>{language == null ? "Save Laguage" : "Update Laguage"}</Button>
    </form>
  );
};

export default LanguageForm;
