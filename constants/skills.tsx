import {
  FaCss3Alt,
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
