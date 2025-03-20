import React from "react";

const Footer = () => {
  return (
    <div className="mx-auto w-full gap-5 bg-brand-section py-5 text-brand-text">
      <div className="mx-auto flex max-w-screen-lg flex-col gap-3 px-5 font-bold">
        <p className="text-xl">Drites</p>

        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold tracking-wide">
            "Where stories take shape and voices find their space."
          </p>
          <div className="flex items-center gap-5 font-medium tracking-wide">
            <p>About us</p>
            <p>Contact us</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
