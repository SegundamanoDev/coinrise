import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
const Whatsapp = () => {
  return (
    <div className="fixed bottom-6 left-6 z-50 hover:scale-110 transition">
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={faWhatsapp}
          size="2x"
          color="#25D366"
          className="w-12 h-12"
        />
      </a>
    </div>
  );
};

export default Whatsapp;
