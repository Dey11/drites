"use client";

import { useOptimistic, useState, useTransition } from "react";

import { Heart } from "lucide-react";

import { handleLike } from "@/app/actions/interactions";
import { cn } from "@/lib/utils";

type LikeButtonProps = {
  isLiked: boolean;
  disabled?: boolean;
  likes: number;
  postId: string;
};

export default function LikeButton({
  isLiked,
  disabled,
  likes,
  postId,
}: LikeButtonProps) {
  const [userLiked, setUserLiked] = useState<boolean>(isLiked);
  const [likeCount, setLikeCount] = useState<number>(likes);
  const [optimisticLike, setOptimisticLike] = useOptimistic<boolean>(userLiked);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit() {
    startTransition(async () => {
      try {
        setOptimisticLike(!optimisticLike);
        const { count, success } = await handleLike({
          postId,
          liked: !userLiked,
        });
        if (success) {
          setUserLiked(!userLiked);
          setLikeCount(count);
        } else {
          console.error("Like operation failed");
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  return (
    <form
      onClick={handleSubmit}
      className={cn(
        "flex cursor-pointer items-center gap-2",
        disabled && "pointer-events-none"
      )}
    >
      <Heart
        className={cn(
          "size-4",
          optimisticLike && "fill-red-500 text-brand-section"
        )}
      />
      <span className={cn("text-sm", isPending && "opacity-50")}>
        {likeCount} Likes
      </span>
    </form>
  );
}
