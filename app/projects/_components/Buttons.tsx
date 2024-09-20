"use client";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

import React from "react";
import { FaChrome, FaHeadset } from "react-icons/fa6";

const Buttons = ({ project }: any) => {
  const router = useRouter();
  return (
    <div className="flex items-center space-x-2">
      {project.liveUrl && (
        <Button
        type="button"

          className="flex gap-2 items-center"
          size="sm"
          onClick={() => router.push(project.liveUrl)}
        >
          <FaChrome /> Live Project
        </Button>
      )}
      {project.githubUrl && (
        <Button
          type="button"
          className="flex gap-2 items-center"
          size="sm"
          onClick={() => router.push(project.githubUrl)}
        >
          <GitHubLogoIcon /> Github
        </Button>
      )}

      <Button className="flex gap-2 items-center" size="sm">
        <FaHeadset />
        Feedback
      </Button>
    </div>
  );
};

export default Buttons;
