"use client";

import React, { useState } from "react";
import { z, ZodIssue } from "zod";
import { FaPaperPlane } from "react-icons/fa";
import { Input, Textarea } from "@/components/atoms";
import { useMouseAnimation } from "@/lib/mouseAnimation";
import { motion } from "framer-motion";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});

  const {
    containerRef,
    handleMouseMove,
    handleMouseLeave,
    handleMouseEnter,
    shadowStyle,
    shadowAnimation,
    shadowTransition,
  } = useMouseAnimation({ hide: true });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "name" || name === "message") {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    } else if (name === "email") {
      const emailResult = z.string().email().safeParse(value);
      if (emailResult.success) {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((err: ZodIssue) => {
        const field = err.path[0] as keyof ContactFormData;
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    // Handle successful form submission here
    console.log("Form submitted", form);
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full bg-white dark:bg-primary/80 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={shadowStyle}
        animate={shadowAnimation}
        transition={shadowTransition}
      />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <Input
          label="Enter your name"
          name="name"
          value={form.name}
          onChange={handleChange}
          autoComplete="off"
          error={errors.name}
        />
        <Input
          label="Enter your email"
          name="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="off"
          type="email"
          error={errors.email}
        />
        <Textarea
          label="Enter your message"
          name="message"
          value={form.message}
          onChange={handleChange}
          autoComplete="off"
          error={errors.message}
        />

        <button className="cta-button group" type="submit">
          <div className="bg-circle" />
          <p className="text">Submit</p>
          <div className="arrow-wrapper">
            <FaPaperPlane className="icon" />
          </div>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
