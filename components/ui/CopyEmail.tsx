"use client";
import { useState } from "react";
import { email } from "@/data";
import { IoCopyOutline } from "react-icons/io5";
import MagicButton from "./MagicButton";

const CopyEmail = () => {
  const [copied, setCopied] = useState(false);

  // Check if running on the client
  const isClient = typeof window !== "undefined";

  const handleCopy = () => {
    if (isClient) {
      const text = email;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="mt-5 relative ">
      <MagicButton
        title={copied ? "successfully copied!" : "Copy my email"}
        icon={<IoCopyOutline />}
        position="left"
        handleClick={handleCopy}
        otherClasses={`${
          copied ? "!bg-green-700" : "bg-[#161A31]"
        } transition-colors ease-in-out `}
      />
    </div>
  );
};

export default CopyEmail;
