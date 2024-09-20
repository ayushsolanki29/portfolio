import MagicButton from "../../../components/ui/MagicButton";
import { CgCode } from "react-icons/cg";
import ProjectCard from "./ProjectCard";
import { getProjects } from "@/app/_actions/projects";

interface RecentProjectsProps {
  title: string;
  boldText: string;
}

const RecentProjects = async ({ title, boldText }: RecentProjectsProps) => {
  const projects = await getProjects();
  return (
    <div className="py-20" id="projects">
      <h1 className="heading">
        {title} <span className="text-purple">{boldText}</span>
      </h1>
      <div className=" flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10">
        {projects.map(
          ({ title, description, techStacks, thumbnail, slug }, index) => (
            <div
              key={index}
              className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            >
              <ProjectCard
                title={title}
                des={description}
                iconLists={techStacks}
                img={thumbnail}
                link={slug}
              />
            </div>
          )
        )}
      </div>
      <div className="text-center">
        <MagicButton
          title="want to see more?"
          position="left"
          otherClasses="text-center w-full"
          icon={<CgCode className="size-5" />}
        />
      </div>
    </div>
  );
};

export default RecentProjects;
