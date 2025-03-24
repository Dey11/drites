"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";

type PreviousStateType = {
  success: boolean;
  message: string;
};

export async function createComment(
  previousState: PreviousStateType | null,
  formData: FormData
) {
  try {
    const session = await auth();
    if (!session.userId) {
      throw new Error("User not authenticated");
    }

    const postId = formData.get("postId") as string;
    const content = formData.get("comment") as string;

    if (!postId || !content) {
      throw new Error("All fields are required");
    }

    const newComment = await prisma.comment.create({
      data: {
        postId,
        content,
        userId: session.userId,
      },
    });

    revalidatePath(`posts/${formData.get("postId")}`);

    return {
      success: true,
      message: "Comment created successfully",
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
