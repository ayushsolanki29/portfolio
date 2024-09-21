import React, { ComponentType, useState } from "react";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "./MultiSelect";

const LaguageSelect = ({
  listData,
  setselectedFramworks,
}: {
  listData: any[];
  setselectedFramworks: any;
}) => {
  let frameworksList: {
    label: string;
    value: string;
    icon?: ComponentType<{ className?: string }>;
  }[] = [];

  frameworksList = listData.map((item: any) => ({
    label: item.name,
    value: item._id,

  }));

  return (
    <div className="space-y-2">
      <Label htmlFor="framworks">Framworks</Label>
      <MultiSelect
        options={frameworksList}
        onValueChange={(selectedValues: any) =>
          setselectedFramworks(selectedValues)
        }
        placeholder="Select your favorite frameworks"
        variant="inverted"
        animation={0.3}
        maxCount={3}
      />
    </div>
  );
};

export default LaguageSelect;
