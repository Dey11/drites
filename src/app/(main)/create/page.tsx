import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import CreateForm from "@/components/create/post-form";
import { H2 } from "@/components/typography/h2";

export default async function CreatePage() {
  const session = await auth();
  if (!session.userId) {
    return redirect("/");
  }

  return (
    <div className="mx-auto h-dvh max-w-screen-lg p-3">
      <H2 className="py-5">Create a New Post</H2>

      <CreateForm />
    </div>
  );
}
