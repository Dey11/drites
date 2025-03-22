"use client";

import { useActionState } from "react";

import { createComment } from "@/app/actions/create-comment";

import { H3 } from "../typography/h3";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type CommentFormProps = {
  isLoggedIn: boolean;
  postId: string;
};

export default function CommentForm({ isLoggedIn, postId }: CommentFormProps) {
  const [state, formAction, isPending] = useActionState(createComment, null);

  return (
    <form
      action={(formData: FormData) => {
        formData.append("postId", postId);
        return formAction(formData);
      }}
    >
      <H3>Comments</H3>

      <Textarea
        id="content"
        placeholder="Write a comment..."
        className="mb-4 mt-2 bg-brand-section"
        name="comment"
      />

      {isLoggedIn && <Button disabled={isPending}>Post Comment</Button>}
      {!isLoggedIn && <Button disabled>Login to comment</Button>}
    </form>
  );
}
