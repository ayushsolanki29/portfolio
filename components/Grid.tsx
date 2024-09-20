import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import { it } from "node:test";
import { gridItems } from "@/data";

const Grid = () => {
  return (
    <section id="about">
       <BentoGrid className="w-full py-20">
        {gridItems.map(
          ({
            className,
            description,
            id,
            img,
            imgClassName,
            spareImg,
            title,
            titleClassName,
          }) => (
            <BentoGridItem
              id={id}
              key={id}
              title={title}
              description={description}
              className={className}
              img={img}
              imgClassName={imgClassName}
              titleClassName={titleClassName}
              spareImg={spareImg}
            />
          )
        )}
      </BentoGrid>
    </section>
  );
};

export default Grid;
