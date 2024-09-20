import React from "react";
import { CardContent, Card } from "@/components/ui/card";

import { CodeIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

interface SkillCardProps {
  name: string;
  description: string;
  Icon: React.FC<any>;
  index: number;
  className?: string;
  children?: React.ReactNode;
}

function SkillCard({
  name,
  description,
  Icon,
  index,
  className,
  children,
}: SkillCardProps) {
  return (
    <Card className={cn("bg-muted/40", className)}>
      <CardContent className="flex flex-col items-start p-6">
        <AccordionItem value={`acc-${index}`} className="w-full border-none">
          <div className="flex w-full items-center justify-between">
            <span className="text-lg font-semibold">({index})</span>
            <Icon className="h-8 w-8" />
          </div>
          <div className="grid gap-0.5">
            <h3 className="mt-2 text-2xl font-bold leading-8 tracking-tight">
              {name}
            </h3>

            <p className="mt-2 text-base text-muted-foreground">
              {description}
            </p>
          </div>

          <AccordionContent className="text-md">
            <Separator className="my-2" />
            <p className="mb-2 last:mb-0">{children}</p>
          </AccordionContent>
        </AccordionItem>
      </CardContent>
    </Card>
  );
}

export default SkillCard;
