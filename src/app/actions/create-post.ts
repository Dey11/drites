"use server";

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

    const newPost = await prisma.post.create({
      data: {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        authorId: session.userId,
      },
    });

    return {
      success: true,
      message: "Post created successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Error creating post",
    };
  }
}
