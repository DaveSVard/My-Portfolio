import dynamic from "next/dynamic";

const ContactPage = dynamic(() => import("@/components/pages").then(mod => ({ default: mod.ContactPage })), {
  loading: () => <div className="sectionContainer min-h-screen" />,
  ssr: true,
});

export default function Contact() {
  return <ContactPage />;
}
