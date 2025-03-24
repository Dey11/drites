"use client";

import { useOptimistic, useState, useTransition } from "react";

import { Bookmark, Heart } from "lucide-react";

import { handleBookmark } from "@/app/actions/interactions";
import { cn } from "@/lib/utils";

type BookmarkButtonProps = {
  isBookmarked: boolean;
  disabled?: boolean;
  postId: string;
};

export default function BookmarkButton({
  isBookmarked,
  disabled,
  postId,
}: BookmarkButtonProps) {
  const [userBookmarked, setUserBookmarked] = useState<boolean>(isBookmarked);
  const [optimisticBookmark, setOptimisticBookmark] =
    useOptimistic<boolean>(userBookmarked);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit() {
    startTransition(async () => {
      try {
        setOptimisticBookmark(!optimisticBookmark);
        const success = await handleBookmark({
          postId,
          bookmarked: !userBookmarked,
        });
        setUserBookmarked(!userBookmarked);
        if (!success) {
          setUserBookmarked(userBookmarked);
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
      <Bookmark
        className={cn("size-4", optimisticBookmark && "fill-brand-blue")}
      />
    </form>
  );
}
