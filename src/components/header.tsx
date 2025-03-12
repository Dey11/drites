import Link from "next/link";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { H3 } from "./typography/h3";
import { Button } from "./ui/button";
import { Suspense } from "react";

const Header = () => {
  return (
    <header className="flex border-b border-black p-3">
      <div className="mx-auto flex w-full max-w-screen-lg items-center justify-between">
        <Link href="/">
          <H3>Drites.</H3>
        </Link>
        <Suspense fallback={<div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />}>
        <SignedOut>
          <Button asChild>
            <SignInButton
              forceRedirectUrl={"/posts"}
              signUpForceRedirectUrl={"/posts"}
            />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
