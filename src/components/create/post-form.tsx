"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function CreateForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {});
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-2">
        <label htmlFor="title" className="">
          Title
        </label>
        <Input
          id="title"
          type="text"
          value={title}
          placeholder="Title"
          className="bg-brand-section"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-y-2">
        <label htmlFor="content">Content</label>
        <Textarea
          id="content"
          placeholder="Type your content in markdown here..."
          className="h-[50dvh] bg-brand-section"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {error && (
        <div
          className="rounded-md bg-red-100 p-4 text-center text-red-700"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}

      <div className="flex w-full items-center justify-end gap-x-2">
        <Link href="/posts">
          <Button className="border border-brand-blue bg-white">Cancel</Button>
        </Link>
        <Button type="submit">Publish</Button>
      </div>
    </form>
  );
}
