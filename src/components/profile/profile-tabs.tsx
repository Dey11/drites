"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import ProfilePostSection from "./posts";

type TabType = {
  id: string;
  name: "Posts" | "Likes" | "Bookmarks";
};

const tabs: TabType[] = [
  {
    id: "posts",
    name: "Posts",
  },
  {
    id: "likes",
    name: "Likes",
  },
  {
    id: "bookmarks",
    name: "Bookmarks",
  },
];

type ProfileTabsProps = {
  posts: {
    id: string;
    createdAt: Date;
    title: string;
    description: string;
  }[];
  bookmarks: {
    post: {
      title: string;
      id: string;
      description: string;
      createdAt: Date;
    };
  }[];
  likes: {
    post: {
      title: string;
      id: string;
      description: string;
      createdAt: Date;
    };
  }[];
};

export default function ProfileTabSection({
  posts,
  bookmarks,
  likes,
}: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<"Posts" | "Likes" | "Bookmarks">(
    "Posts"
  );

  const bookmarksData = bookmarks.map((bmk) => {
    return {
      id: bmk.post.id,
      createdAt: bmk.post.createdAt,
      title: bmk.post.title,
      description: bmk.post.description,
    };
  });

  const likesData = likes.map((like) => {
    return {
      id: like.post.id,
      createdAt: like.post.createdAt,
      title: like.post.title,
      description: like.post.description,
    };
  });

  return (
    <div className="py-10">
      <div className="mb-10 flex w-fit gap-1 rounded-[3px] bg-slate-100 p-1">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              "rounded-[3px] px-2 text-center text-slate-800 transition-all hover:cursor-pointer hover:bg-white hover:text-slate-800",
              activeTab === tab.name ? "bg-white text-slate-800" : ""
            )}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
          </div>
        ))}
      </div>

      {activeTab === "Posts" && (
        <ProfilePostSection posts={posts} activeTab={activeTab} />
      )}
      {activeTab === "Likes" && (
        <ProfilePostSection posts={likesData} activeTab={activeTab} />
      )}
      {activeTab === "Bookmarks" && (
        <ProfilePostSection posts={bookmarksData} activeTab={activeTab} />
      )}
    </div>
  );
}
