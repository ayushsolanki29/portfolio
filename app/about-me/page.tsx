import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems, skills } from "@/data";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SkillCard from "./_components/SkillCard";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div>
      {" "}
      <FloatingNav navItems={navItems} />
      <br />
      <br />
      <div className="py-20 w-full">
        <div className="w-full py-24 lg:py-32" id="about">
          <div className="px-4 md:px-6">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                  About Me
                </h2>
                <div className="space-y-4">
                  <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    I am a passionate and creative Web Developer with a love for
                    beautiful and functional websites. I have experience working
                    with a variety of web technologies and frameworks and I am
                    always eager to learn new things and take on new challenges.
                  </p>
                  <div className="flex gap-2">
                    <Button asChild variant={"outline"}>
                      <a href="/resume.pdf" target="_blank">
                        View Resume <ArrowUpRightIcon className="ml-2 size-5" />
                      </a>
                    </Button>
                    <Button asChild>
                      <Link href="/projects">See my Work</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="relative flex w-full items-center justify-end">
                <Image
                  alt="Image"
                  className="aspect-square h-full overflow-hidden rounded-xl object-cover object-center"
                  src="/profile.jpg"
                  width={550}
                  height={550}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full py-24 lg:py-32" id="skills">
          <div className="space-y-4 px-4 md:px-6 lg:space-y-10">
            <div className="flex w-full flex-col items-center justify-center text-center lg:flex-row lg:justify-between lg:text-left">
              <div className="flex flex-col items-center lg:items-start">
                <h2 className="heading">
                  My <span className="text-purple">Skills</span>
                </h2>
              </div>
              <p className="mt-4 hidden text-gray-500 dark:text-gray-400 lg:mt-0 lg:block lg:w-[50%]">
                Here are some of my skills where I&apos;ve turned knowledge into
                expertise, making things happen.
              </p>
            </div>
            <div className="mt-6">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {skills.map((skill: any, index: number) => (
                  <SkillCard
                    key={`skill_${index}`}
                    index={index + 1}
                    name={skill.name}
                    description={skill.description}
                    Icon={skill.Icon}
                  />
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
