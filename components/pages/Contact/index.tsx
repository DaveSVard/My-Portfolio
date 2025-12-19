"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { contact } from "@/constants/index";
import { ContactForm, MyContacts } from "./components";
import { fadeIn, opacityAnimation } from "@/lib/motion";
import { InViewContainer } from "@/components/atoms";

const Computer = dynamic(() => import("./components").then(mod => ({ default: mod.Computer })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
      <div className="text-gray-500 dark:text-gray-400">Loading 3D model...</div>
    </div>
  ),
});

const ContactPage = () => {
  const { title, description, socials, email, phone, languages } = contact;

  return (
    <InViewContainer className="sectionContainer">
      <div className="max-w-3xl mx-auto flex flex-col gap-y-3 items-center justify-center text-center mt-10">
        <motion.h1
          variants={fadeIn({
            direction: "up",
            type: "tween",
            delay: 1.5,
            duration: 0.4,
          })}
          className="text-4xl font-bold"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={fadeIn({
            direction: "up",
            type: "tween",
            delay: 1.6,
            duration: 0.4,
          })}
          className="text-gray-500 dark:text-gray-400"
        >
          {description}
        </motion.p>
      </div>

      <motion.div
        variants={opacityAnimation({
          delay: 1.7,
          duration: 0.4,
          type: "tween",
          ease: "easeOut",
        })}
        className="flex flex-col items-center justify-center gap-y-10 lg:gap-x-10 mt-10"
      >
        <div className="w-full md:w-1/2">
          <div className="w-full h-full hover:cursor-grab rounded-md overflow-hidden">
            <Computer />
          </div>
        </div>

        <div className="w-full pb-10 flex flex-col mdl:flex-row gap-5">
          <div className="w-full mdl:w-2/3">
            <ContactForm />
          </div>

          <MyContacts
            phone={phone}
            email={email}
            socials={socials}
            languages={languages}
          />
        </div>
      </motion.div>
    </InViewContainer>
  );
};

export default ContactPage;
