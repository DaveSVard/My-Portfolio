import dynamic from "next/dynamic";

const Homepage = dynamic(() => import("@/components/pages").then(mod => ({ default: mod.Homepage })), {
  loading: () => <div className="sectionContainer min-h-screen" />,
  ssr: true,
});

export default function Home() {
  return <Homepage />;
}
