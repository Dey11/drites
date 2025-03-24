import { Metadata } from "next";
import Link from "next/link";

import { Bookmark, Heart } from "lucide-react";

import { H2 } from "@/components/typography/h2";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Latest Posts | Drites",
  description: "Explore the latest posts and articles on Drites platform",
  keywords: ["drites", "blog", "articles", "posts", "writing", "content"],
  openGraph: {
    title: "Latest Posts | Drites",
    description: "Explore the latest posts and articles on Drites platform",
    url: "https://drites.site/posts",
    siteName: "Drites",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Latest Posts | Drites",
    description: "Explore the latest posts and articles on Drites platform",
  },
};

const page = async () => {
  const allPosts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    omit: {
      content: true,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
      likes: {
        select: {
          id: true,
        },
      },
    },
  });

  return (
    <div className="mx-auto min-h-dvh max-w-screen-lg px-3 pb-10">
      <H2 className="py-5">Latest Posts</H2>

      {allPosts.map((post) => (
        <div key={post.id} className="mb-3">
          <PostCard
            id={post.id}
            title={post.title}
            description={post.description!}
            likes={post.likes.length}
            author={post.author.username!}
            createdAt={post.createdAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          />
        </div>
      ))}
    </div>
  );
};

export default page;

type PostType = {
  id: string;
  title: string;
  description: string;
  likes: number;
  author: string;
  createdAt: string;
};

function PostCard({
  id,
  title,
  description,
  likes,
  author,
  createdAt,
}: PostType) {
  return (
    <Link href={`/posts/${id}`}>
      <div className="flex w-full flex-col gap-2 rounded-lg p-5 shadow-md">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-slate-300">
            {author.charAt(0).toUpperCase()}
          </div>
          <div className="text-sm">
            <p className="font-medium">{author}</p>
            <p className="text-xs">{createdAt}</p>
          </div>
        </div>

        <h3 className="line-clamp-1 text-lg font-bold">{title}</h3>

        <p className="line-clamp-2">
          {description.slice(0, 100) + (description.length > 100 ? "..." : "")}
        </p>

        <div className="flex items-center justify-between text-sm">
          <p className="flex items-center gap-1">
            <Heart className="size-4 cursor-pointer" />
            {likes}
          </p>

          <Bookmark className="size-4 cursor-pointer" />
        </div>
      </div>
    </Link>
  );
}
