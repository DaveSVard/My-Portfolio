"use client";

import { contact } from "@/constants";
import { ContactForm, Computer } from "./components";

const ContactPage = () => {
  const { title, description } = contact;

  return (
    <div className="sectionContainer">
      <div className="max-w-3xl mx-auto flex flex-col gap-y-3 items-center justify-center text-center mt-10">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-y-10 lg:gap-x-10 mt-10">
        <div className="w-full md:w-1/2">
          <div className="w-full h-full hover:cursor-grab rounded-md overflow-hidden">
            <Computer />
          </div>
        </div>

        <div className="w-full lg:w-3/4 pb-10">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
