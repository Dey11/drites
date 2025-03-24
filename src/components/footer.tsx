import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="mx-auto w-full gap-5 border border-t-slate-400 bg-brand-section py-5 text-brand-text">
      <div className="mx-auto flex max-w-screen-lg flex-col gap-3 px-5 font-semibold">
        <p className="text-xl">Drites</p>

        <div className="flex items-center justify-between">
          <p className="text-lg font-medium tracking-wide">
            "Where stories take shape and voices find their space."
          </p>
          <div className="flex items-center gap-5 font-medium tracking-wide">
            <Link href="/about">
              <p>About</p>
            </Link>
            <Link href="/contact-us">
              <p>Contact</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
