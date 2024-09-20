import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  active?: boolean;
  onClick?(): void;
  tooltip?: string;
}

const ToolButton: FC<Props> = ({ children, onClick, active, tooltip }) => {
  return (
    <Button
      type="button"
      variant={"ghost"}
      onClick={onClick}
      className={cn(
        "p-2 rounded-md transition-colors duration-300",
        active
          ? "bg-gray-800 text-white"
          : "bg-gray-100 text-gray-800"
      )}
      title={tooltip}
    >
      {children}
    </Button>
  );
};

export default ToolButton;
