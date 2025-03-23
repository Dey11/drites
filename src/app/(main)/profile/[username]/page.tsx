import { redirect } from "next/navigation";

import Avatar from "@/components/avatar";
import ProfileTabSection from "@/components/profile/profile-tabs";
import { prisma } from "@/lib/prisma";

type ProfileProps = {
  params: Promise<{
    username: string;
  }>;
};

export default async function ProfilePage({ params }: ProfileProps) {
  const { username } = await params;

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!user) {
    redirect("/not-found");
  }

  const [allPosts, bookmarkedPosts, likedPosts] = await Promise.all([
    prisma.post.findMany({
      where: {
        authorId: user?.id,
      },
    }),
    prisma.bookmark.findMany({
      where: {
        userId: user?.id,
      },
      select: {
        post: {
          select: {
            id: true,
            description: true,
            title: true,
            createdAt: true,
          },
        },
      },
    }),
    prisma.postLike.findMany({
      where: {
        userId: user?.id,
      },
      select: {
        post: {
          select: {
            id: true,
            description: true,
            title: true,
            createdAt: true,
          },
        },
      },
    }),
  ]);

  return (
    <div className="mx-auto min-h-dvh max-w-screen-lg p-3 pt-5">
      <div className="flex items-center gap-5">
        <Avatar name={username} className="md:size-20 md:text-3xl" />

        <div className="flex flex-col gap-1">
          <p className="text-2xl font-semibold tracking-tight">{user.name}</p>
          <p className="text-slate-700">@{user.username}</p>
        </div>
      </div>

      <ProfileTabSection
        posts={allPosts}
        bookmarks={bookmarkedPosts}
        likes={likedPosts}
      />
    </div>
  );
}
