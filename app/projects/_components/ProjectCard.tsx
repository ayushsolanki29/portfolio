"use client"
import React from "react";
import { PinContainer } from "../../../components/ui/3d-pin";
import { FaLocationArrow } from "react-icons/fa6";

interface Props {
  link: string;
  img: string;
  title: string;
  des: string;
  iconLists: any;
}
const ProjectCard = ({ link, img, title, des, iconLists }: Props) => {
  const urlTitle = title.split(" ").join("_");
  return (
    <PinContainer title={`/projects/${urlTitle}`} href={`/projects/${link}`}>
      <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
        <div
          className="relative w-full h-full overflow-hidden lg:rounded-3xl"
          style={{ backgroundColor: "#13162D" }}
        >
          <img src="/bg.png" alt="bgimg" />
        </div>
        <img src={img} alt="cover" className="z-10 absolute bottom-0" />
      </div>

      <h1 className="font-bold lg:text-1xl md:text-xl text-base line-clamp-1">
        {title}
      </h1>

      <p
        className="lg:text-xs lg:font-normal font-light text-sm line-clamp-2"
        style={{
          color: "#BEC1DD",
          margin: "1vh 0",
        }}
      >
        {des}
      </p>

      <div className="flex items-center justify-between mt-7 mb-3">
        <div className="flex items-center">
          {iconLists.map((icon: any, index: number) => (
            <div
              key={index}
              className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
              style={{
                transform: `translateX(-${5 * index + 2}px)`,
              }}
            >
              <img src={icon.image} alt="icon5" className="p-2" />
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center">
          <p className="flex md:text-xs text-sm text-purple">View More</p>
          <FaLocationArrow className="ms-3" color="#CBACF9" />
        </div>
      </div>
    </PinContainer>
  );
};

export default ProjectCard;
