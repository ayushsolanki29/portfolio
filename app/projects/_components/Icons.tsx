import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import React from "react";

interface Props {
  iconsList: ItemProps[];
}

interface ItemProps {
  name: string;
  role: string;
  image: string;
}

interface AccProps {
  id: number;
  name: string;
  designation: string;
  image: string;
}

const Icons = ({ iconsList }: Props) => {
  const storeItems = (iconsList: ItemProps[]): AccProps[] => {
    return iconsList.map((item, index) => ({
      id: index,
      name: item.name,
      designation: item.role,
      image: item.image,
    }));
  };

  const items = storeItems(iconsList);

  return (
    <div className="flex items-center space-x-2">
      <a href="#tech_stacks">
        <div
          className="rounded-full bg-gray-900 flex justify-center items-center"
          style={{
            transform: `translateX(-${5 * 1 + 2}px)`,
          }}
        >
          <AnimatedTooltip items={items} />
        </div>
      </a>
    </div>
  );
};

export default Icons;
