import {
  FaCss3Alt,
  FaGithub,
  FaLinkedinIn,
  FaHtml5,
  FaSass,
  FaReact,
  FaNodeJs,
  FaWordpress,
  FaMagic,
  FaBootstrap,
  FaJs,
} from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import {
  RiNextjsFill,
  RiRemixRunFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import {
  SiDaisyui,
  SiExpress,
  SiGutenberg,
  SiPostgresql,
  SiReactrouter,
  SiShadcnui,
  SiThreedotjs,
  SiZod,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";

export const header = {
  links: [
    {
      name: "home",
      path: "/",
    },
    {
      name: "skills",
      path: "/skills",
    },
    {
      name: "contact",
      path: "/contact",
    },
  ],
};

export const homepage = {
  about: {
    name: "David Vardanyan",
    specialization: "Forntend Developer",
    interest:
      "I am passionate about learning and creating new things that will make life a little easier.",
    words: ["impactful", "innovative", "user-friendly", "scalable", "modern"],
  },
  stats: [
    { value: 2, infoText: "Years of experience" },
    { value: 12, infoText: "Project completed" },
    { value: 13, infoText: "Technologies mastered" },
  ],
};

export const contact = {
  title: "Let’s Create Something Together",
  description:
    "Got an idea, project, or just a quick “hello”? I’m always happy to connect—whether it’s for collaboration, freelance work, or simply sharing thoughts. Drop me a message, and let’s make something awesome happen!",
  socials: [
    {
      icon: <FaGithub />,
      path: "https://github.com/DaveSVard",
      name: "Visit my GitHub profile",
    },
    {
      icon: <FaLinkedinIn />,
      path: "https://www.linkedin.com/in/david-vardanyan-738b95336/",
      name: "Visit my LinkedIn profile",
    },
  ],
  email: {
    alt: "vardanyan003@gmail.com",
    href: "mailto:vardanyan003@gmail.com",
  },
  phone: { alt: "(+374) 96 88 89 03", href: "tel:+37496888903" },
  languages: "Armenian, English, Russian",
};

export const skills = {
  title: "My Technical",
  highligthed: "Skills",
  description:
    "I specialize in creating modern, scalable, and user-friendly web applications using cutting-edge technologies.",
  passion: {
    title: "I'm passionate about",
    specializations: ["Frontend Development", "Backend Development"],
  },
  technolgies: [
    {
      id: 1,
      info: "I create projects on a solid foundation: I use semantic HTML, scalable CSS/SASS, and clean, type-safe JavaScript/TypeScript.",
      logos: [
        {
          id: 1,
          type: "icon",
          title: "HTML 5",
          Icon: <FaHtml5 className="icon-class" />,
        },
        {
          id: 2,
          type: "icon",
          title: "CSS 3",
          Icon: <FaCss3Alt className="icon-class" />,
        },
        { id: 3, type: "icon", title: "SASS", Icon: <FaSass className="icon-class" /> },
        { id: 4, type: "icon", title: "JavaScript", Icon: <FaJs className="icon-class" /> },
        {
          id: 5,
          type: "icon",
          title: "TypeScript",
          Icon: <BiLogoTypescript className="icon-class" />,
        },
      ],
    },
    {
      id: 2,
      info: "I build modern, high-performance web applications with React and its ecosystem — from server-side rendering with Next.js, Remix.js, and React Router V7.",
      logos: [
        {
          id: 1,
          type: "icon",
          title: "React JS",
          Icon: <FaReact className="icon-class" />,
        },
        {
          id: 2,
          type: "icon",
          title: "Next JS",
          Icon: <RiNextjsFill className="icon-class" />,
        },
        {
          id: 3,
          type: "icon",
          title: "Remix JS",
          Icon: <RiRemixRunFill className="icon-class" />,
        },
        {
          id: 4,
          type: "icon",
          title: "React Router V7",
          Icon: <SiReactrouter className="icon-class" />,
        },
      ],
    },
    {
      id: 3,
      info: "I ensure data reliability and user convenience by applying schema validation with Zod and Yup.",
      logos: [
        { id: 1, type: "icon", title: "Zod", Icon: <SiZod className="icon-class" /> },
        { id: 2, type: "text", title: "Yup" },
      ],
    },
    {
      id: 4,
      info: "I use Tailwind CSS and modern UI libraries for fast and convenient interface development.",
      logos: [
        {
          id: 1,
          type: "icon",
          title: "Tailwind CSS",
          Icon: <RiTailwindCssFill className="icon-class" />,
        },
        {
          id: 2,
          type: "icon",
          title: "Shadcn UI",
          Icon: <SiShadcnui className="icon-class" />,
        },
        {
          id: 3,
          type: "icon",
          title: "Daisy UI",
          Icon: <SiDaisyui className="icon-class" />,
        },
        {
          id: 4,
          type: "icon",
          title: "Magic UI",
          Icon: <FaMagic className="icon-class" />,
        },
        // { id: 5, type: "image", image: "/assets/skills/aceternityLogo.png" },
        {
          id: 6,
          type: "icon",
          title: "Bootstrap",
          Icon: <FaBootstrap className="icon-class" />,
        },
      ],
    },
    {
      id: 5,
      info: "I bring interfaces to life with smooth and expressive animations that enhance user perception and experience.",
      logos: [
        { id: 1, type: "text", title: "GSAP" },
        {
          id: 2,
          type: "icon",
          title: "Framer Motion",
          Icon: <TbBrandFramerMotion className="icon-class" />,
        },
      ],
    },
    {
      id: 6,
      info: "I experiment with 3D visualization and interactive effects to make projects go beyond flat design.",
      logos: [
        {
          id: 1,
          type: "icon",
          title: "Three JS",
          Icon: <SiThreedotjs className="icon-class" />,
        },
      ],
    },
    {
      id: 7,
      info: "I develop secure APIs using Node.js and Express, as well as manage structured data with PostgreSQL for a reliable server-side.",
      logos: [
        {
          id: 1,
          type: "icon",
          title: "Node JS",
          Icon: <FaNodeJs className="icon-class" />,
        },
        {
          id: 2,
          type: "icon",
          title: "Express",
          Icon: <SiExpress className="icon-class" />,
        },
        {
          id: 3,
          type: "icon",
          title: "PostgreSQL",
          Icon: <SiPostgresql className="icon-class" />,
        },
      ],
    },
    {
      id: 8,
      info: "I know a bit about WordPress, with extensions like Gutenberg blocks through plugins.",
      logos: [
        {
          id: 1,
          type: "icon",
          title: "WordPress",
          Icon: <FaWordpress className="icon-class" />,
        },
        {
          id: 2,
          type: "icon",
          title: "Gutenberg",
          Icon: <SiGutenberg className="icon-class" />,
        },
      ],
    },
  ],
};

export const resume = {
  about: {
    title: "About me",
    description:
      "Lotem ipsum dolor sit amet consectetur adipsicing elit. Voluptates quibusdam sunt.",
    info: [
      {
        fieldName: "Name",
        fieldValue: "David Vardanyan",
      },
      {
        fieldName: "Nationality",
        fieldValue: "Armenian",
      },
      {
        fieldName: "Phone",
        fieldValue: "(+374) 96 88 89 03",
      },
      {
        fieldName: "Freelance",
        fieldValue: "Available",
      },
      {
        fieldName: "Email",
        fieldValue: "vardanyan003@gmail.com",
      },
      {
        fieldName: "Languages",
        fieldValue: "Armenian, English, Russian",
      },
    ],
  },
  experience: {
    title: "My experience",
    description:
      "Lotem ipsum dolor sit amet consectetur adipsicing elit. Voluptates quibusdam sunt.",
    items: [
      {
        company: "Profit D.C.",
        position: "Front-End Developer",
        duration: "2024 - Present",
      },
    ],
  },
  skills: {
    title: "My skills",
    description:
      "Lotem ipsum dolor sit amet consectetur adipsicing elit. Voluptates quibusdam sunt.",
    technologies: [
      {
        name: "HTML 5",
        icon: "/assets/skills/html.webp",
      },
      {
        name: "CSS 3",
        icon: "/assets/skills/css.png",
      },
      {
        name: "JavaScript",
        icon: "/assets/skills/javascript.png",
      },
      {
        name: "TypeScript",
        icon: "/assets/skills/typescript.webp",
      },
      {
        name: "React JS",
        icon: "/assets/skills/reactjs.webp",
      },
      {
        name: "Redux Toolkit",
        icon: "/assets/skills/redux.webp",
      },
      {
        name: "Tailwind CSS",
        icon: "/assets/skills/tailwind.webp",
      },
      {
        name: "Three JS",
        icon: "/assets/skills/threejs.webp",
      },
      {
        name: "git",
        icon: "/assets/skills/git.webp",
      },
      {
        name: "figma",
        icon: "/assets/skills/figma.webp",
      },
      {
        name: "docker",
        icon: "/assets/skills/docker.webp",
      },
      {
        name: "zod",
        icon: "/assets/skills/zod.png",
      },
      {
        name: "remix",
        icon: "/assets/skills/remix.webp",
      },
      {
        name: "sass",
        icon: "/assets/skills/sass.webp",
      },
      {
        name: "strapi",
        icon: "/assets/skills/strapi.webp",
      },
      {
        name: "next",
        icon: "/assets/skills/next.webp",
      },
    ],
  },
};

export const work = {
  works: [
    {
      num: "01",
      category: "Frontend",
      title: "Project 1",
      description:
        "Lotem ipsum dolor sit amet consectetur adipsicing elit. Voluptates quibusdam sunt.",
      stack: [{ name: "Html 5" }, { name: "Css 3" }, { name: "JavaScript" }],
      image: "/assets/workImage.png",
      live: "",
      gitHub: "",
    },
    {
      num: "02",
      category: "Frontend",
      title: "Project 2",
      description:
        "Lotem ipsum dolor sit amet consectetur adipsicing elit. Voluptates quibusdam sunt.",
      stack: [{ name: "Html 5" }, { name: "Css 3" }, { name: "JavaScript" }],
      image: "/assets/workImage.png",
      live: "",
      gitHub: "",
    },
    {
      num: "03",
      category: "Frontend",
      title: "Project 3",
      description:
        "Lotem ipsum dolor sit amet consectetur adipsicing elit. Voluptates quibusdam sunt.",
      stack: [{ name: "Html 5" }, { name: "Css 3" }, { name: "JavaScript" }],
      image: "/assets/workImage.png",
      live: "",
      gitHub: "",
    },
    {
      num: "04",
      category: "Frontend",
      title: "Project 4",
      description:
        "Lotem ipsum dolor sit amet consectetur adipsicing elit. Voluptates quibusdam sunt.",
      stack: [{ name: "Html 5" }, { name: "Css 3" }, { name: "JavaScript" }],
      image: "/assets/workImage.png",
      live: "",
      gitHub: "",
    },
  ],
};
