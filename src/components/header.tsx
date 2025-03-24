import Link from "next/link";
import { Suspense } from "react";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";

import { H3 } from "./typography/h3";
import { Button } from "./ui/button";

const Header = async () => {
  const session = await auth();
  let user;
  if (session.userId) {
    user = await prisma.user.findUnique({
      where: {
        id: session.userId,
      },
      select: {
        username: true,
      },
    });
  }

  return (
    <header className="flex border-b border-brand-blue p-3">
      <div className="mx-auto flex w-full max-w-screen-lg items-center justify-between">
        <Link href="/">
          <H3>Drites.</H3>
        </Link>
        <Suspense
          fallback={
            <div className="size-8 animate-pulse rounded-full bg-gray-200" />
          }
        >
          <SignedOut>
            <Button asChild>
              <SignInButton
                mode="modal"
                forceRedirectUrl={"/posts"}
                signUpForceRedirectUrl={"/posts"}
              />
            </Button>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-x-2">
              <Link href={"/profile/" + user?.username}>
                <Button className="px-3 text-sm font-medium">Profile</Button>
              </Link>
              <Link href={"/create"}>
                <Button className="px-3 text-sm font-medium">
                  Create Post
                </Button>
              </Link>
              <UserButton />
            </div>
          </SignedIn>
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
