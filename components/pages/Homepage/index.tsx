"use client";

import { homepage } from "@/constants";
import { Hero, Stats } from "./components";

const Homepage = () => {
  const { about, stats } = homepage;

  return (
    <div className="sectionContainer">
      {about && <Hero {...about} />}

      {stats && <Stats stats={stats} />}
    </div>
  );
};

export default Homepage;
