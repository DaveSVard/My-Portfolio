"use client";

import { homepage } from "@/constants";
import { Hero, Stats } from "./components";

const Homepage = () => {
  const { about, stats } = homepage;

  return (
    <div>
      <div className="sectionContainer">
        {about && <Hero {...about} />}

        {stats && <Stats stats={stats} />}
      </div>
    </div>
  );
};

export default Homepage;
