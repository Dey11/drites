import Image from "next/image";
import Link from "next/link";

import { auth } from "@clerk/nextjs/server";
import {
  ArrowRight,
  BookOpen,
  ChartNoAxesColumn,
  Feather,
  Tag,
} from "lucide-react";

import FeatureBox from "@/components/home/feature-box";
import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import { H3 } from "@/components/typography/h3";
import { Para } from "@/components/typography/para";
import { Button } from "@/components/ui/button";
import { features } from "@/lib/constants";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="pb-16">
      <div className="relative h-screen w-full overflow-hidden">
        <section className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
          <Image
            src={"/feather.svg"}
            alt="feather"
            className="absolute -z-10"
            width={500}
            height={500}
          />

          <H1>Where ideas find</H1>
          <H1>their audience.</H1>

          <Para>
            Read, write, and connect with thinkers on any topic that matters to
            you.
          </Para>

          <Link href="/posts" className="mt-8 flex gap-x-2 px-7">
            <Button>
              <span>Start Reading</span>
              <ArrowRight />
            </Button>
          </Link>
        </section>
      </div>

      <section className="mx-auto w-full bg-brand-section px-3 py-20 pb-20 text-center">
        <H2 className="pb-10 text-4xl">Discover a world of ideas</H2>

        <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureBox
              key={feature.title}
              Icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-screen-lg px-3 py-20">
        <H2 className="pb-10 text-center">For readers & writers</H2>
        <div className="grid grid-cols-1 gap-x-10 gap-y-5 px-5 md:grid-cols-2">
          <div className="rounded-xl bg-brand-section p-5 shadow-md">
            <H3 className="pb-8">Readers</H3>

            <div className="flex flex-col flex-wrap gap-y-4">
              <Para>
                Discover stories, thinking, and expertise from writers on any
                topic.
              </Para>

              <ul className="flex flex-col gap-y-2">
                <li className="flex items-center gap-x-2">
                  <Tag className="size-4 text-brand-blue" />
                  Browse by category
                </li>
                <li className="flex items-center gap-x-2">
                  <BookOpen className="size-4 text-brand-blue" />
                  Save and share stories
                </li>
              </ul>

              <Button className="w-fit font-normal">Explore Categories</Button>
            </div>
          </div>

          <div className="rounded-xl bg-brand-section p-5 shadow-md">
            <H3 className="pb-8">Writers</H3>

            <div className="flex flex-col flex-wrap gap-y-4">
              <Para>
                Share your ideas, stories, and knowledge with a vast audience.
              </Para>

              <ul className="flex flex-col gap-y-2">
                <li className="flex items-center gap-x-2">
                  <Feather className="size-4 text-brand-blue" />
                  Easy-to-use editor
                </li>
                <li className="flex items-center gap-x-2">
                  <ChartNoAxesColumn className="size-4 text-brand-blue" />
                  Detailed analytics
                </li>
              </ul>

              <Button className="w-fit font-normal">Start Writing</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="absolute inset-x-0 mx-auto w-full bg-brand-section px-3 py-20 text-center">
        <H2>Join our community today</H2>
        <Para className="mx-auto max-w-2xl md:text-lg">
          Start reading and writing on topics that matter to you. Connect with a
          global audience and share your perspective.
        </Para>
        <Button className="mx-auto mt-5 flex gap-x-2 px-8 font-normal">
          Get started for free
          <ArrowRight />
        </Button>
      </section>
    </div>
  );
}
