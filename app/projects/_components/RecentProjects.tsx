"use client"
import MagicButton from "../../../components/ui/MagicButton";
import { CgCode } from "react-icons/cg";
import ProjectCard, { SkeletonCard } from "./ProjectCard";
import axios from "axios";
import { useEffect, useState } from "react";

interface RecentProjectsProps {
  title: string;
  boldText: string;
}

const RecentProjects = ({ title, boldText }: RecentProjectsProps) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects/frontend-get'); // Adjust this URL as necessary
        if (response.data.success) {
          setProjects(response.data.projects);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) 
    return (
      <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="py-20" id="projects">
      <h1 className="heading">
        {title} <span className="text-purple">{boldText}</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10">
        {projects.map(({ title, description, techStacks, thumbnail, slug }, index) => (
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
        ))}
      </div>
      <div className="text-center">
        <MagicButton
          title="Want to see more?"
          position="left"
          otherClasses="text-center w-full"
          icon={<CgCode className="size-5" />}
        />
      </div>
    </div>
  );
};

export default RecentProjects;
