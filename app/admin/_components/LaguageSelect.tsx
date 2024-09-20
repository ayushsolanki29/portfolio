"use client";
import React, { ComponentType, useState } from "react";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "./MultiSelect";

const LaguageSelect = ({ listData }: { listData: any[] }) => {
  const [selectedFramworks, setselectedFramworks] = useState([]);

  let frameworksList: {
    label: string;
    value: string;
    icon?: ComponentType<{ className?: string }>;
  }[] = [];

  frameworksList = listData.map((item: any) => ({
    label: item.name,
    value: item.id,
  }));

  return (
    <div className="space-y-2">
      <input
        type="hidden"
        name="techStacks"
        value={JSON.stringify(selectedFramworks)}
      />
      <Label htmlFor="framworks">Framworks</Label>
      <MultiSelect
        options={frameworksList}
        onValueChange={(selectedValues: any) =>
          setselectedFramworks(selectedValues)
        }
        defaultValue={[]}
        placeholder="Select your favorite frameworks"
        variant="inverted"
        animation={0.3}
        maxCount={3}
      />
    </div>
  );
};

export default LaguageSelect;
