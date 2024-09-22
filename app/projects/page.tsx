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
  const [loading, setLoading] = useState(false); // initially false because no request made yet
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Initially assume there are more projects
  const { ref, inView } = useInView();

  const fetchProjects = async () => {
    if (!hasMore || loading) return; // Prevent fetching when no more data or already loading
    setLoading(true);
    try {
      const response = await axios.get(`/api/projects/frontend-get?page=${page}`);
      if (response.data.success) {
        const newProjects = response.data.projects;
        setProjects((prev) => [...prev, ...newProjects]);
        setHasMore(newProjects.length > 0); // If no new projects, stop future fetches
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false); // Always stop loading once the fetch is complete
    }
  };

  // Fetch projects whenever page is incremented
  useEffect(() => {
    fetchProjects();
  }, [page]);

  // Trigger the next page when the bottom of the page is in view
  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  if (loading && projects.length === 0) {
    // Show skeletons if initially loading with no data
    return (
      <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <FloatingNav navItems={navItems} />
      <br />
      <br />
      <div className="py-20">
        <h1 className="heading">
          collection of{" "}
          <span className="text-purple">my Projects</span>
        </h1>
        <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-1">
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
          {loading &&
            Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
        </div>
        {/* This div will trigger pagination when in view */}
        <div className="flex justify-center items-center w-full" ref={ref}>
          {loading && <span>Loading more...</span>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Projects;
