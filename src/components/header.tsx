import Link from "next/link";
import { Suspense } from "react";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { H3 } from "./typography/h3";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Header = () => {
  return (
    <header className="flex border-b border-black p-3">
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
                forceRedirectUrl={"/posts"}
                signUpForceRedirectUrl={"/posts"}
              />
            </Button>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-x-2">
              <Input
                placeholder="Search Posts..."
                className="mx-2 h-9 border border-black bg-brand-section"
              />
              <Button>Create Post</Button>
              <UserButton />
            </div>
          </SignedIn>
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
