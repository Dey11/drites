import Image from "next/image";

import { BookOpen, Feather, Users } from "lucide-react";

import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import { H3 } from "@/components/typography/h3";
import { Para } from "@/components/typography/para";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="relative flex flex-col items-center justify-center px-4 py-20 text-center">
        <Image
          src={"/feather.svg"}
          alt="feather"
          className="absolute -z-10 opacity-10"
          width={500}
          height={500}
          priority
        />
        <H1>About Drites</H1>
        <Para className="mx-auto max-w-2xl pt-4 text-lg">
          The platform where stories take shape and voices find their space.
        </Para>
      </section>

      <section className="mx-auto w-full bg-brand-section px-4 py-16">
        <div className="mx-auto max-w-screen-lg">
          <H2 className="pb-6 text-center">Our Mission</H2>
          <Para className="mx-auto max-w-3xl text-center">
            At Drites, we believe everyone has a story worth sharing. Our
            mission is to create a space where writers can express themselves
            freely, and readers can discover meaningful content that resonates
            with them.
          </Para>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-white p-4">
                <Feather className="size-8 text-brand-blue" />
              </div>
              <H3 className="mb-2">Freedom of Expression</H3>
              <Para>
                We provide tools that help writers craft their ideas into
                polished content.
              </Para>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-white p-4">
                <Users className="size-8 text-brand-blue" />
              </div>
              <H3 className="mb-2">Community</H3>
              <Para>
                We foster a community where thoughtful discussion and feedback
                help ideas grow.
              </Para>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-white p-4">
                <BookOpen className="size-8 text-brand-blue" />
              </div>
              <H3 className="mb-2">Knowledge Sharing</H3>
              <Para>
                We believe in the power of shared knowledge to enlighten,
                inspire, and transform.
              </Para>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-lg px-4 py-16">
        <H2 className="pb-6 text-center">Our Story</H2>

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex-1">
            <Para>
              Drites began in 2024 with a simple idea: to create a platform
              where quality content is valued over algorithms. I wanted to build
              a space that prioritizes thoughtful writing and meaningful
              connections.
            </Para>
            <Para className="mt-4">
              What started as a small personal project has now been expanded
              into a production ready application.
            </Para>
          </div>

          <div className="flex-1">
            <Para>
              Unlike many other platforms, we've maintained our commitment to a
              clean, distraction-free reading experience, with no intrusive ads
              or algorithmic manipulation of what you see. We believe in letting
              great content speak for itself.
            </Para>
            <Para className="mt-4">
              As we continue to grow, our focus remains on providing the best
              possible tools for writers to share their ideas and for readers to
              discover content that matters to them.
            </Para>
          </div>
        </div>
      </section>
    </div>
  );
}
