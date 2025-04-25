import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { auth } from "@clerk/nextjs/server";
import Markdown from "react-markdown";

import Avatar from "@/components/avatar";
import ButtonsSection from "@/components/posts/buttons-section";
import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import { H3 } from "@/components/typography/h3";
import { H4 } from "@/components/typography/h4";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const { slug } = await props.params;

  const post = await prisma.post.findUnique({
    where: {
      id: slug,
    },
    select: {
      title: true,
      content: true,
      description: true,
      author: {
        select: {
          name: true,
          username: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  const description = post.description.substring(0, 160);
  const keywords = ["blog", "article", "technical writing"];

  return {
    title: post.title,
    description: description,
    keywords: keywords,
    authors: [{ name: post.author.name || post.author.username! }],
    alternates: {
      canonical: `/posts/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `/posts/${slug}`,
      title: post.title,
      description: description,
      publishedTime: post.createdAt.toDateString(),
      modifiedTime: post.updatedAt.toDateString(),
      authors: post.author.name,
      section: "Blog",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const session = await auth();
  let isLoggedIn = false;

  if (session.userId) {
    isLoggedIn = true;
  }

  const post = await prisma.post.findUnique({
    where: {
      id: slug,
    },
    select: {
      title: true,
      content: true,
      author: {
        select: {
          username: true,
          name: true,
        },
      },
      createdAt: true,
      likes: true,
    },
  });

  if (!post) {
    redirect("/not-found");
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-screen-lg flex-col gap-5 px-4 py-8">
      <H1>{post.title}</H1>

      <div className="flex items-center gap-2 pb-5">
        <Avatar name={post.author.username || post.author.name || "U"} />
        <div>
          <p className="text-sm font-semibold">
            {post.author.username || post.author.name}
          </p>
          <p className="text-xs">
            Posted on {post.createdAt.toLocaleDateString()}
          </p>
        </div>
      </div>

      <Markdown
        components={{
          h1: ({ children }) => <H2>{children}</H2>,
          h2: ({ children }) => <H3>{children}</H3>,
          h3: ({ children }) => <H4>{children}</H4>,
          h4: ({ children }) => (
            <h4 className="text-lg font-bold">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-base font-bold">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-sm font-bold">{children}</h6>
          ),
          p: ({ children }) => (
            <p className="text-base font-normal">{children}</p>
          ),
          a: ({ children, href }) => (
            <a href={href} className="text-blue-500 underline">
              {children}
            </a>
          ),
          pre: ({ children }) => (
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              {children}
            </pre>
          ),
          code: ({ children }) => (
            <code className="rounded-md bg-gray-100 p-1 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              {children}
            </code>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 dark:border-gray-700 dark:text-gray-400">
              {children}
            </blockquote>
          ),
        }}
      >
        {post.content}
      </Markdown>

      <hr className="my-5" />

      <Suspense>
        <ButtonsSection
          likes={post.likes.length}
          slug={slug}
          userId={session.userId ? session.userId : null}
        />
      </Suspense>
    </div>
  );
}

// export async function generateStaticParams() {
//   const posts = await prisma.post.findMany({
//     select: {
//       id: true,
//     },
//   });

//   return posts.map((post) => ({
//     slug: post.id,
//   }));
// }
