import dynamic from "next/dynamic";

const ResumePage = dynamic(() => import("@/components/pages/Resume"), {
  loading: () => <div className="sectionContainer min-h-screen" />,
  ssr: true,
});

export default function Resume() {
  return <ResumePage />;
}
