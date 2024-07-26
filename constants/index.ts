// import css from "/assets/skills/css.png";
// import docker from "/assets/skills/docker.png";
// import figma from "/assets/skills/figma.png";
// import git from "/assets/skills/git.png";
// import html from "/assets/skills/html.png";
// import javascript from "/assets/skills/javascript.png";
// import mongodb from "/assets/skills/mongodb.png";
// import nodejs from "/assets/skills/nodejs.png";
// import reactjs from "/assets/skills/reactjs.png";
// import redux from "/assets/skills/redux.png";
// import tailwind from "/assets/skills/tailwind.png";
// import typescript from "/assets/skills/typescript.png";
// import threejs from "/assets/skills/threejs.svg";

export const data = {
  navigationLinks: [
    {
      name: "home",
      path: "/",
    },
    {
      name: "resume",
      path: "/resume",
    },
    {
      name: "work",
      path: "/work",
    },
    {
      name: "contact",
      path: "/contact",
    },
  ],
  logo: {
    name: "Logo",
    url: "/assets/MyLogoV2.png",
  },
  heroSection: {
    about: {
      name: "David",
      specialization: "Forntend Developer",
      interest:
        "I like to create fast, beautiful and user-friendly applications. I am passionate about learning and creating new things that will make life a little easier.",
    },
    stats: [
      { value: 1, infoText: "Years of experience" },
      { value: 5, infoText: "Project completed" },
      { value: 10, infoText: "Technologies mastered" },
      { value: 500, infoText: "Code commits" },
    ],
  },
  resume: {
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
          // fieldValue: ["Armenian", "English", "Russian"],
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
          icon: "/assets/skills/html.png",
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
          icon: "/assets/skills/typescript.png",
        },
        {
          name: "React JS",
          icon: "/assets/skills/reactjs.png",
        },
        {
          name: "Redux Toolkit",
          icon: "/assets/skills/redux.png",
        },
        {
          name: "Tailwind CSS",
          icon: "/assets/skills/tailwind.png",
        },
        {
          name: "Three JS",
          icon: "/assets/skills/threejs.svg",
        },
        {
          name: "git",
          icon: "/assets/skills/git.png",
        },
        {
          name: "figma",
          icon: "/assets/skills/figma.png",
        },
        {
          name: "docker",
          icon: "/assets/skills/docker.png",
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
          icon: "/assets/skills/sass.png",
        },
        {
          name: "strapi",
          icon: "/assets/skills/strapi.png",
        },
        {
          name: "next",
          icon: "/assets/skills/next.png",
        },
      ],
    },
  },
};
