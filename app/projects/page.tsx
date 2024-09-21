"use client";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import ProjectCard, { SkeletonCard } from "./_components/ProjectCard";
import axios from "axios";
import { useInView } from "react-intersection-observer";

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  useEffect(() => {
    const fetchProjects = async () => {
      if (!hasMore) return;
      setLoading(true);
      try {
        const response = await axios.get(`/api/projects/frontend-get?page=${page}`);
        if (response.data.success) {
          setProjects((prev) => [...prev, ...response.data.projects]);
          setHasMore(response.data.projects.length > 0);
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
  }, [page, hasMore]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, loading]);

  if (loading && projects.length === 0)
    return (
      <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <FloatingNav navItems={navItems} />
      <br />
      <br />
      <div className="py-20" id="projects">
        <h1 className="heading">
          Here is a small collection of{" "}
          <span className="text-purple">my Projects</span>
        </h1>
        <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10">
          {projects.map(({ title, description, techStacks, thumbnail, slug }, index) => (
            <div key={index} className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]">
              <ProjectCard
                title={title}
                des={description}
                iconLists={techStacks}
                img={thumbnail}
                link={slug}
              />
            </div>
          ))}
          {loading && 
            Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
        </div>
        <div className="flex justify-center items-center w-full" ref={ref}>
          {loading && <span>Loading more...</span>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Projects;
