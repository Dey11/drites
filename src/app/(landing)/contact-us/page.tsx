"use client";

import Image from "next/image";
import { useState } from "react";

import { Mail, MapPin, Phone, Send } from "lucide-react";

import { createFeedback } from "@/app/actions/feedback";
import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import { H3 } from "@/components/typography/h3";
import { Para } from "@/components/typography/para";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await createFeedback(formState);

    setSubmitMessage({
      type: "success",
      text: "Thank you for your message! We'll get back to you soon.",
    });
    setIsSubmitting(false);

    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-dvh">
      <section className="relative flex flex-col items-center justify-center px-4 py-20 text-center">
        <Image
          src={"/feather.svg"}
          alt="feather"
          className="absolute -z-10 opacity-10"
          width={500}
          height={500}
          priority
        />
        <H1>Contact Us</H1>
        <Para className="mx-auto max-w-2xl pt-4 text-lg">
          Have questions or feedback? We'd love to hear from you.
        </Para>
      </section>

      <section className="mx-auto max-w-screen-lg px-4 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <H2 className="mb-6">Get in Touch</H2>
            <Para className="mb-8">
              Whether you have a question about features, pricing, need a demo,
              or anything else, our team is ready to answer all your questions.
            </Para>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-section">
                  <Mail className="size-5 text-brand-blue" />
                </div>
                <div>
                  <H3 className="text-lg">Email Us</H3>
                  <Para className="text-slate-600">shreyandey11@gmail.com</Para>
                  <Para className="text-slate-600">
                    shreyandey1102@gmail.com
                  </Para>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-section">
                  <Phone className="size-5 text-brand-blue" />
                </div>
                <div>
                  <H3 className="text-lg">Call Us</H3>
                  <Para className="text-slate-600">+91 (000) 000-0000</Para>
                  <Para className="text-slate-600">Mon-Fri, 9AM-5PM IST</Para>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-brand-section p-6 shadow-md">
            <H2 className="mb-6">Send a Message</H2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium"
                >
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-1 block text-sm font-medium"
                >
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                  className="bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block text-sm font-medium"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  required
                  className="min-h-32 bg-white"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="size-4" />
              </Button>

              {submitMessage.type && (
                <div
                  className={`mt-4 rounded-md p-3 text-sm ${
                    submitMessage.type === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full bg-brand-section px-4 py-16">
        <div className="mx-auto max-w-screen-lg">
          <H2 className="mb-8 text-center">Frequently Asked Questions</H2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                question: "How quickly do you respond to inquiries?",
                answer:
                  "We aim to respond to all inquiries within 24-48 hours during business days.",
              },
              {
                question: "Do you offer support for technical issues?",
                answer:
                  "Yes, our technical support team is available to help with any platform-related issues you might encounter.",
              },
              {
                question: "Can I request a feature for Drites?",
                answer:
                  "Absolutely! We welcome feature suggestions and regularly incorporate user feedback into our development roadmap.",
              },
              {
                question: "How can I report inappropriate content?",
                answer:
                  "You can report inappropriate content by contacting our support team directly.",
              },
            ].map((item, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow-md">
                <H3 className="mb-2">{item.question}</H3>
                <Para className="text-slate-600">{item.answer}</Para>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
