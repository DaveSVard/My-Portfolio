import dynamic from "next/dynamic";

const SkillsPage = dynamic(() => import("@/components/pages").then(mod => ({ default: mod.SkillsPage })), {
  loading: () => <div className="sectionContainer min-h-screen" />,
  ssr: true,
});

export default function Skills() {
  return <SkillsPage />;
}
