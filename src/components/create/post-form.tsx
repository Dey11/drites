"use client";

import Link from "next/link";
import { useActionState } from "react";

import { createPost } from "@/app/actions/create-post";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function CreateForm() {
  const [state, formAction, isPending] = useActionState(createPost, null);

  return (
    <form action={formAction} className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-2">
        <label htmlFor="title" className="">
          Title
        </label>
        <Input
          id="title"
          type="text"
          name="title"
          placeholder="Title"
          className="bg-brand-section"
        />
      </div>

      <div className="flex flex-col gap-y-2">
        <label htmlFor="Description" className="">
          Description
        </label>
        <Input
          id="description"
          type="text"
          name="description"
          placeholder="A line about your blog"
          className="bg-brand-section"
        />
      </div>

      <div className="flex flex-col gap-y-2">
        <label htmlFor="content">Content</label>
        <Textarea
          id="content"
          placeholder="Type your content in markdown here..."
          className="h-[50dvh] bg-brand-section"
          name="content"
        />
      </div>

      <div className="flex w-full items-center justify-end gap-x-2">
        <Link href="/posts">
          <Button
            disabled={isPending}
            className="border border-brand-blue bg-white"
          >
            Cancel
          </Button>
        </Link>
        <Button disabled={isPending}>Publish</Button>
      </div>

      {state?.success && (
        <div className="mt-5 flex w-full items-center justify-center rounded-lg bg-green-100 p-4 text-sm text-green-700">
          {state.message}
        </div>
      )}
      {state?.success === false && (
        <div className="mt-5 flex w-full items-center justify-center rounded-lg bg-red-100 p-4 text-sm text-red-700">
          {state.message}
        </div>
      )}
    </form>
  );
}
