import { Trash } from "lucide-react";

import { deletePost } from "@/app/actions/posts";

import { H3 } from "../typography/h3";

type PostProps = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  activeTab: "Posts" | "Likes" | "Bookmarks";
};

export default function Post({
  id,
  title,
  description,
  createdAt,
  activeTab,
}: PostProps) {
  let date = createdAt.toDateString();

  const handlePostDelete = async () => {
    try {
      await deletePost(id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative cursor-pointer">
      <div
        onClick={() => (window.location.href = `/posts/${id}`)}
        className="flex flex-col justify-between gap-4 rounded-lg bg-brand-section p-4"
      >
        <H3 className="line-clamp-1">{title}</H3>
        <p className="line-clamp-2 text-slate-700">
          {description.slice(0, 100) + (description.length > 100 ? "..." : "")}
        </p>
        <span className="text-xs font-medium text-slate-600">{date}</span>
      </div>
      {activeTab === "Posts" && (
        <div className="absolute right-2 top-2 z-10">
          <Trash
            className="size-5 fill-red-400 transition-all hover:size-6"
            onClick={handlePostDelete}
          />
        </div>
      )}
    </div>
  );
}
