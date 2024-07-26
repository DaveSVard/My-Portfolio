import { Stats } from "@/components/organisms/Stats";
import { Hero } from "@/components/organisms/Hero";
import { data } from "@/constants";

export default function Home() {
  const { heroSection } = data;

  return (
    <section className="h-full">
      <div className="sectionContainer">
        {heroSection.about && (
          <Hero {...heroSection.about} />
        )}

        {heroSection.stats && (
          <Stats stats={heroSection.stats} />
        )}
      </div>
    </section>
  );
}
