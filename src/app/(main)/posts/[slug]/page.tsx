import { Metadata } from "next";
import { notFound } from "next/navigation";

import { auth } from "@clerk/nextjs/server";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import Markdown from "react-markdown";

import Avatar from "@/components/avatar";
import CommentSection from "@/components/comments/comments-section";
import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import { H3 } from "@/components/typography/h3";
import { H4 } from "@/components/typography/h4";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = await prisma.post.findUnique({
    where: {
      id: params.slug,
    },
    select: {
      title: true,
      content: true,
    },
  });

  if (!post) {
    return notFound();
  }

  const title = post.title;

  return {
    title,
    openGraph: {
      title,
      description: (post.content as string).substring(0, 25) + "...",
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const session = await auth();

  const [post, comments] = await Promise.all([
    prisma.post.findUnique({
      where: {
        id: slug,
      },
      select: {
        title: true,
        content: true,
        author: true,
        createdAt: true,
        likes: true,
      },
    }),
    prisma.comment.findMany({
      where: {
        postId: slug,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        userId: true,
        user: {
          select: {
            username: true,
          },
        },
      },
    }),
  ]);

  const commentsArr = comments.map((comment) => {
    return {
      id: comment.id,
      content: comment.content,
      user: comment.user.username!,
      img: "Placeholder", // Placeholder for user image
      userId: comment.userId,
      createdAt: comment.createdAt.toISOString(),
    };
  });

  if (!post) {
    return notFound();
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-screen-lg flex-col gap-5 px-4 py-8">
      <H1>{post.title}</H1>

      <div className="flex items-center gap-2">
        <Avatar name={post.author.name || "U"} />
        <div>
          <p className="text-sm font-semibold">{post.author.name}</p>
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
        }}
      >
        {post.content}
      </Markdown>

      <hr className="my-5" />

      <div className="flex justify-between px-2">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <Heart className="size-4" />
            <span className="text-sm">{post.likes.length} Likes</span>
          </div>

          <div className="flex items-center gap-2">
            <MessageCircle className="size-4" />
            <span className="text-sm">{commentsArr.length} Comments</span>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <Bookmark className="size-4" />
          </div>

          <div className="flex items-center gap-3">
            <Share2 className="size-4" />
          </div>
        </div>
      </div>

      <CommentSection
        comments={commentsArr}
        postId={slug}
        isLoggedIn={session.userId ? true : false}
      />
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
    },
  });

  return posts.map((post) => ({
    slug: post.id,
  }));
}
