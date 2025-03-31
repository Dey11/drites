import { MetadataRoute } from "next";

import { prisma } from "@/lib/prisma";

// Define the correct types for sitemap entries
type SitemapEntry = {
  url: string;
  lastModified?: Date | string;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.drites.site";

  const staticPages: SitemapEntry[] = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Dynamic posts from database
  let postEntries: SitemapEntry[] = [];
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    postEntries = posts.map((post) => ({
      url: `${baseUrl}/posts/${post.id}`,
      lastModified: post.updatedAt,
      changeFrequency: "daily",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error fetching posts for sitemap:", error);
  }

  let userEntries: SitemapEntry[] = [];
  try {
    const users = await prisma.user.findMany({
      select: {
        username: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    userEntries = users.map((user) => ({
      url: `${baseUrl}/profile/${user.username}`,
      lastModified: user.updatedAt,
      changeFrequency: "daily",
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Error fetching users for sitemap:", error);
  }

  return [...staticPages, ...postEntries, ...userEntries];
}
