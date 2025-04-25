import { MessageCircle } from "lucide-react";

import { prisma } from "@/lib/prisma";

import Comments from "../comments/comments";
import BookmarkButton from "../interactions/bookmark";
import LikeButton from "../interactions/like";
import ShareButton from "../share-btn";

type BottomSectionProps = {
  slug: string;
  userId: string | null;
  likes: number;
};

export default async function ButtonsSection({
  slug,
  userId,
  likes,
}: BottomSectionProps) {
  let userHasLiked = false;
  let userHasBookmarked = false;

  if (userId) {
    const [postLiked, postBookmarked] = await Promise.all([
      prisma.postLike.findFirst({
        where: {
          postId: slug,
          userId: userId,
        },
      }),
      prisma.bookmark.findFirst({
        where: {
          postId: slug,
          userId: userId,
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

    userHasLiked = postLiked ? true : false;
    userHasBookmarked = postBookmarked ? true : false;
  }

  const comments = await prisma.comment.findMany({
    where: {
      postId: slug,
    },
    select: {
      user: true,
      content: true,
      id: true,
      createdAt: true,
      userId: true,
    },
  });
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
  return (
    <>
      <div className="flex justify-between px-2">
        <div className="flex items-center gap-10">
          <LikeButton
            isLiked={userHasLiked}
            likes={likes}
            disabled={userId ? false : true}
            postId={slug}
          />

          <div className="flex items-center gap-2">
            <MessageCircle className="size-4" />
            <span className="text-sm">{commentsArr.length} Comments</span>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <BookmarkButton
              isBookmarked={userHasBookmarked}
              disabled={userId ? false : true}
              postId={slug}
            />
          </div>

          <div className="flex items-center gap-3">
            <ShareButton
              url={`${process.env.NEXT_PUBLIC_APP_URL || ""}/posts/${slug}`}
            />
          </div>
        </div>
      </div>

      <Comments
        comments={commentsArr}
        postId={slug}
        isLoggedIn={userId ? true : false}
      />
    </>
  );
}
