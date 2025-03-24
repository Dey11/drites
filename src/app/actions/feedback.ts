"use server";

import { prisma } from "@/lib/prisma";

export async function createFeedback(form: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const { name, email, subject, message } = form;

    if (!name || !email || !subject || !message) {
      throw new Error("All fields are required");
    }

    const newFeedback = await prisma.feedback.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    return {
      success: true,
      message: "Feedback created successfully",
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
      message: "Error creating feedback",
    };
  }
}
