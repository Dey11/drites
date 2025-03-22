"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";

type PreviousStateType = {
  success: boolean;
  message: string;
};

export async function createPost(
  previousState: PreviousStateType | null,
  formData: FormData
) {
  try {
    const session = await auth();
    if (!session.userId) {
      throw new Error("User not authenticated");
    }

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const description = formData.get("description") as string;

    if (!title || !content || !description) {
      throw new Error("All fields are required");
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        description,
        authorId: session.userId,
      },
    });

    revalidatePath("/posts");

    return {
      success: true,
      message: "Post created successfully",
    };
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return {
        success: false,
        message: err.message,
      };
    }
    return {
      success: false,
      message: "Error creating post",
    };
  }
}
