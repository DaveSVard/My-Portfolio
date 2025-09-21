"use client";

import { motion } from "framer-motion";
import { contact } from "@/constants/index";
import { ContactForm, Computer, MyContacts } from "./components";
import { fadeIn, opacityAnimation } from "@/lib/motion";
import { InViewContainer } from "@/components/atoms";

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
