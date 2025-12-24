import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export const contact = {
  title: "Let's Create Something Together",
  description:
    "Got an idea, project, or just a quick \"hello\"? I'm always happy to connect—whether it's for collaboration, freelance work, or simply sharing thoughts. Drop me a message, and let's make something awesome happen!",
  socials: [
    {
      icon: <FaGithub />,
      path: "https://github.com/DaveSVard",
    },
    {
      icon: <FaLinkedinIn />,
      path: "https://www.linkedin.com/in/david-vardanyan-738b95336/",
    },
  ],
  email: {
    alt: "vardanyan003@gmail.com",
    href: "mailto:vardanyan003@gmail.com",
  },
  phone: { alt: "(+374) 96 88 89 03", href: "tel:+37496888903" },
  languages: "Armenian, English, Russian",
};
