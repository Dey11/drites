import { Metadata } from "next";
import { redirect } from "next/navigation";

import Avatar from "@/components/avatar";
import ProfileTabSection from "@/components/profile/profile-tabs";
import { prisma } from "@/lib/prisma";

type ProfileProps = {
  params: Promise<{
    username: string;
  }>;
};

async function getUserByUsername(username: string) {
  return await prisma.user.findFirst({
    where: {
      username,
    },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;

  const user = await getUserByUsername(username);

  if (!user) {
    return {
      title: "Profile Not Found",
      description: "The requested user profile could not be found.",
    };
  }

  return {
    title: `${user.name || username}'s Profile`,
    description: `Check out ${user.name || username}'s posts and activity on Drites.`,
    alternates: {
      canonical: `/profile/${username}`,
    },
    openGraph: {
      type: "profile",
      url: `/profile/${username}`,
      title: `${user.name || username}'s Profile | Drites.`,
      description: `Check out ${user.name || username}'s posts and activity on Drites.`,
    },
    twitter: {
      card: "summary",
      title: `${user.name || username}'s Profile | Drites.`,
      description: `Check out ${user.name || username}'s posts and activity on Drites.`,
    },
  };
}

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
    <div>
      <div className="mx-auto min-h-dvh max-w-screen-lg p-3 pt-5">
        <div className="flex items-center gap-5"></div>
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
