import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";
import React from "react";
import RecentProjects from "./_components/RecentProjects";
import Footer from "@/components/Footer";

const Projects = async () => {
  return (
    <div>
      {" "}
      <FloatingNav navItems={navItems} />
      <br />
      <br />
      <RecentProjects title="All Projects " boldText="By Me" />
      <Footer />
    </div>
  );
};

export default Projects;
