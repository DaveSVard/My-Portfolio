"use client";

import { Stats } from "@/components/organisms";
import { homepage } from "@/constants";
import { Hero } from "./components";

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
