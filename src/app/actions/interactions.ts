"use server";

import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";

type HandleLikeProps = {
  postId: string;
  liked: boolean;
};
type HandleBookmarkProps = {
  postId: string;
  bookmarked: boolean;
};

export async function handleLike({ postId, liked }: HandleLikeProps): Promise<{
  success: boolean;
  count: number;
}> {
  let success = false;
  try {
    const session = await auth();
    if (!session.userId) {
      throw new Error("User not authenticated");
    }

    if (liked) {
      await prisma.postLike.create({
        data: {
          postId,
          userId: session.userId,
        },
      });
    } else {
      await prisma.postLike.deleteMany({
        where: {
          postId,
          userId: session.userId,
        },
      });
    }
    success = true;
  } catch (err) {
    console.log(err);
  } finally {
    const likeCount = await prisma.postLike.count({
      where: {
        postId,
      },
    });
    return { success, count: likeCount ? likeCount : 0 };
  }
}

export async function handleBookmark({
  postId,
  bookmarked,
}: HandleBookmarkProps): Promise<boolean> {
  try {
    const session = await auth();
    if (!session.userId) {
      throw new Error("User not authenticated");
    }

    if (bookmarked) {
      await prisma.bookmark.create({
        data: {
          postId,
          userId: session.userId,
        },
      });
    } else {
      await prisma.bookmark.deleteMany({
        where: {
          postId,
          userId: session.userId,
        },
      });
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
