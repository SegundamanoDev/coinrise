import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-20 text-sm">
      <div className="grid md:grid-cols-3 gap-10">
        {/* CONTACT US */}
        <div>
          <h3 className="text-lg font-bold mb-4">CONTACT US</h3>
          <p className="flex items-start gap-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1" />1
            Trustvest Road, Austin, Texas 78725, United State of America.
          </p>
          <p className="flex items-center gap-2 mt-3">
            <FontAwesomeIcon icon={faEnvelope} />
            info@trustvestfx.com
          </p>
          <p className="flex items-center gap-2 mt-2">
            <FontAwesomeIcon icon={faEnvelope} />
            info@trustvestfx.com
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-lg font-bold mb-4">LINKS</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Buy crypto
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Conflict Handling Policy
              </a>
            </li>
          </ul>
        </div>

        {/* SOCIAL MEDIA */}
        <div>
          <h3 className="text-lg font-bold mb-4">SOCIAL MEDIA</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-yellow-500">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="hover:text-yellow-500">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="hover:text-yellow-500">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
          <p className="flex items-center gap-2">
            <FontAwesomeIcon icon={faLock} className="text-yellow-500" />
            SSL Encryption
          </p>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-xs text-center">
        <p>
          All materials and services provided on this site are subject to
          copyright and belong to "Trustvest Limited".
          <br />
          Any use of materials must be approved by an official representative.
          In case of violation, they will be prosecuted.
        </p>
        <p className="mt-3">Copyright© 2025 - All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
