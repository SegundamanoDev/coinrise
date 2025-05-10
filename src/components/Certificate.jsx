import React from "react";
import certi from "../assets/certificate.png";
import certii from "../assets/certificatei.png";
import certiii from "../assets/certificateii.png";
const Certificate = () => {
  return (
    <div className="p-5">
      <p className="mb-5">
        REGULATION AND SAFETY OF FUNDS is a regulated broker so trading with us
        is absolutely safe. Where is registered and regulated? Registered by the
        Company House, The Registrar of Companies for England and Wales as a
        Private Limited Company in 1999. is regulated by the Cyprus Security
        Exchange Commission (CySEC) since 14th December 2014. has also been
        accredited by the Financial Conduct Authority (FCA) since 2015. We are
        authorized and registered with the U.S. National Futures Association
        (NFA) ID: 0308926 since 12/11/2001. is an official member of the
        Financial Commission, category - A and is entitled to £20,000 coverage
        per clients complaint. has been granted a USA Markets Limited License
        under section 14 of the Financial Services Act since 11th August 2000
      </p>
      <div className="w-full h-auto object-cover mb-5">
        <img className="w-full" src={certi} alt="certi" />
      </div>
      <div className="w-full h-auto object-cover mb-5">
        <img className="w-full" src={certii} alt="certi" />
      </div>
      <div className="w-full h-auto object-cover mb-5">
        <img className="w-full" src={certiii} alt="certi" />
      </div>
    </div>
  );
};

export default Certificate;
