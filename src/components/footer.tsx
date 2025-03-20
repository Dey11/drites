import React from "react";

const Footer = () => {
  return (
    <div className="mx-auto w-full gap-5 bg-brand-section py-5 text-brand-text">
      <div className="mx-auto max-w-screen-lg px-5 font-bold">
        <div>Drites</div>

        <div className="flex items-center justify-between">
          <p>"Where stories take shape and voices find their space."</p>
          <div className="flex items-center gap-5 font-normal">
            <p>About us</p>
            <p>Contact us</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
