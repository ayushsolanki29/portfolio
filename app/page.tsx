import Approch from "@/components/Approch";
// import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";
import RecentProjects from "./projects/_components/RecentProjects";

const HomePage = () => {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <Hero />
      <Grid />
      <RecentProjects title="Small collection of" boldText="Projects" />
      {/* <Clients /> */}
      <Experience />
      <Approch />
      <Footer />
    </>
  );
};

export default HomePage;
