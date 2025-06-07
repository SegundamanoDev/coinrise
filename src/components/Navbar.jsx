import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../features/users/authSlice"; // Adjust path if necessary

import { Menu, X, User, LogOut, ChevronDown, Globe } from "lucide-react";
import {
  Home as HomeIcon,
  Info as InfoIcon,
  HardDrive as AffiliateIcon,
  Mail as MailIcon,
  LogIn as SignInIcon,
  LogOut as SignOutIcon,
} from "lucide-react";

import logo from "../assets/trustvest.png"; // Assuming this path is correct

// Define supported languages for Google Translate (using the actual codes)
const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "zh-CN", name: "中文 (简体)" },
  { code: "hi", name: "हिन्दी" },
  { code: "ar", name: "العربية" },
  { code: "pt", name: "Português" },
  { code: "ru", name: "Русский" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "it", name: "Italiano" },
  { code: "nl", name: "Nederlands" },
  { code: "sv", name: "Svenska" },
  { code: "pl", name: "Polski" },
  { code: "tr", name: "Türkçe" },
  { code: "vi", name: "Tiếng Việt" },
  { code: "th", name: "ไทย" },
  { code: "id", name: "Bahasa Indonesia" },
  { code: "uk", name: "Українська" },
  { code: "he", name: "עברית" },
  { code: "da", name: "Dansk" },
  { code: "fi", name: "Suomi" },
  { code: "no", name: "Norsk" },
  { code: "hu", name: "Magyar" },
  { code: "cs", name: "Čeština" },
  { code: "el", name: "Ελληνικά" },
  { code: "ro", name: "Română" },
  { code: "sk", name: "Slovenčina" },
  { code: "bg", name: "Български" },
  { code: "hr", name: "Hrvatski" },
  { code: "fa", name: "فارسی" },
  { code: "ur", name: "اردو" },
  { code: "bn", name: "বাংলা" },
  { code: "pa", name: "ਪੰਜਾਬੀ" },
  { code: "gu", name: "ગુજરાતી" },
  { code: "ta", name: "தமிழ்" },
  { code: "te", name: "తెలుగు" },
  { code: "kn", name: "ಕನ್ನಡ" },
  { code: "ml", name: "മലയാളം" },
  { code: "my", name: "မြန်မာ" },
  { code: "ka", name: "ქართული" },
  { code: "am", name: " አማርኛ" },
  { code: "sw", name: "Kiswahili" },
  { code: "zu", name: "IsiZulu" },
  { code: "ha", name: "Hausa" },
  { code: "ig", name: "Igbo" },
  { code: "yo", name: "Yoruba" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTranslateDropdownOpen, setIsTranslateDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isGoogleTranslateLoaded, setIsGoogleTranslateLoaded] = useState(false);

  const lastScrollY = useRef(0);
  const translateRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.users);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const toggleTranslateDropdown = useCallback((event) => {
    event.stopPropagation();
    setIsTranslateDropdownOpen((prev) => !prev);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    closeMobileMenu();
    navigate("/sign-in");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        translateRef.current &&
        !translateRef.current.contains(event.target)
      ) {
        setIsTranslateDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Google Translate Widget Initialization
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!document.getElementById("google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.type = "text/javascript";
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        window.googleTranslateElementInit = () => {
          console.log("Google Translate global init callback fired.");
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              layout:
                window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            "google_translate_element" // Targeting the HIDDEN div
          );
          setIsGoogleTranslateLoaded(true);
          console.log("Google Translate widget initialized and flag set.");
        };
      } else {
        console.log("Google Translate script already exists.");
        // If script is already there, check if the widget is already initialized
        if (
          window.google &&
          window.google.translate &&
          document.querySelector(".goog-te-combo")
        ) {
          setIsGoogleTranslateLoaded(true);
          console.log("Google Translate widget found already initialized.");
        }
      }
    };

    addGoogleTranslateScript();
  }, []);

  // Function to programmatically change the language via Google Translate
  const changeLanguage = useCallback(
    (langCode, retryCount = 0) => {
      console.log(
        `Attempting to change language to: ${langCode}, Retry: ${retryCount}`
      );
      const MAX_RETRIES = 10; // Increased retries
      const RETRY_DELAY_MS = 200; // Increased delay

      const googleBar = document.querySelector(".goog-te-combo");

      if (
        isGoogleTranslateLoaded &&
        googleBar &&
        googleBar.options.length > 0
      ) {
        console.log("Google Translate select element found and loaded.");
        googleBar.value = langCode;
        googleBar.dispatchEvent(new Event("change"));
        console.log(`Language successfully changed to: ${langCode}`);
        setIsTranslateDropdownOpen(false); // Close dropdown after successful selection
      } else if (retryCount < MAX_RETRIES) {
        console.warn(
          `Google Translate select element not ready (or options missing). Retrying in ${RETRY_DELAY_MS}ms...`
        );
        setTimeout(
          () => changeLanguage(langCode, retryCount + 1),
          RETRY_DELAY_MS
        );
      } else {
        console.error(
          `Failed to change language to ${langCode} after ${MAX_RETRIES} retries. Widget not responsive.`
        );
        // Optionally show a user-facing error message here
      }
    },
    [isGoogleTranslateLoaded]
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 30);
      setHidden(currentScrollY > lastScrollY.current && currentScrollY > 100);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 px-4 py-3 sm:px-6 transition-all duration-300 flex items-center justify-between font-montserrat text-white
        ${
          scrolled
            ? "bg-gray-900/80 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }
        ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <Link to="/" className="flex-shrink-0">
          <img
            className="h-9 sm:h-11 object-contain"
            src={logo}
            alt="TrustVest Logo"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center space-x-6 lg:space-x-8 text-lg font-medium">
          <li>
            <Link
              className="hover:text-blue-300 transition-colors duration-200"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-blue-300 transition-colors duration-200"
              to="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-blue-300 transition-colors duration-200"
              to="/affiliate"
            >
              Affiliate
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-blue-300 transition-colors duration-200"
              to="/contact"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Desktop Auth and Translate */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {/* Google Translate Dropdown */}
          <div className="relative" ref={translateRef}>
            <button
              onClick={toggleTranslateDropdown}
              className="flex items-center gap-1 px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200 text-base"
              aria-haspopup="true"
              aria-expanded={isTranslateDropdownOpen ? "true" : "false"}
            >
              <Globe size={18} /> Translate{" "}
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                  isTranslateDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {isTranslateDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-xl overflow-hidden z-50 max-h-60 overflow-y-auto custom-scroll"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Critical: The hidden div for Google Translate widget. Must be present. */}
                <div
                  id="google_translate_element"
                  style={{ display: "none" }} // Use display:none for clean hiding
                />
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-150"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {!user ? (
            <Link
              to="/sign-in"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Sign In
            </Link>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="p-2 text-red-400 hover:text-red-300 transition-colors duration-200"
                title="Logout"
              >
                <LogOut size={28} />
              </button>
              {/* Desktop User Avatar Link */}
              <Link
                to="/dashboard"
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-700 transition-colors duration-200"
                title={user?.fullName || "Dashboard"}
              >
                {/* Avatar Container: Ensures perfect rounding */}
                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-400">
                  {profile?.avatar?.secure_url ? (
                    <img
                      src={profile.avatar.secure_url}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/96x96/555/FFF?text=${
                          user?.fullName ? user.fullName[0].toUpperCase() : "U"
                        }`;
                        e.target.style.objectFit = "contain";
                        e.target.style.backgroundColor = "#2563eb"; // blue-600
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold">
                      {user?.fullName ? user.fullName[0].toUpperCase() : "U"}
                    </div>
                  )}
                </div>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button
          className="md:hidden z-50 text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open mobile menu"
        >
          <Menu size={30} />
        </button>
      </nav>

      {/* Sidebar Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 sm:w-80 bg-gray-900 text-gray-100 z-50 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col`}
      >
        <div className="relative p-5 flex justify-between items-center border-b border-gray-700 bg-gray-800 shadow-md">
          <span className="text-2xl font-bold text-blue-400">Navigation</span>
          <button
            onClick={closeMobileMenu}
            className="text-gray-400 hover:text-white p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Close mobile menu"
          >
            <X size={28} />
          </button>
        </div>

        {user && (
          <div className="p-6 border-b border-gray-700 bg-gray-800 flex items-center gap-4">
            {/* Avatar Container: Ensures perfect rounding */}
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-400 shadow-md">
              {profile?.avatar?.secure_url ? (
                <img
                  src={profile.avatar.secure_url}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/96x96/555/FFF?text=${
                      user?.fullName ? user.fullName[0].toUpperCase() : "U"
                    }`;
                    e.target.style.objectFit = "contain";
                    e.target.style.backgroundColor = "#2563eb"; // blue-600
                  }}
                />
              ) : (
                <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  {user?.fullName ? user.fullName[0].toUpperCase() : "U"}
                </div>
              )}
            </div>
            <div>
              <p className="text-xl font-semibold text-white">
                {user?.fullName || "Guest User"}
              </p>
              <Link
                to="/dashboard"
                onClick={closeMobileMenu}
                className="text-blue-300 hover:text-white text-sm transition-colors duration-200 flex items-center mt-1"
              >
                <User size={16} className="mr-1" /> View Dashboard
              </Link>
            </div>
          </div>
        )}

        <ul className="flex-grow p-6 space-y-4 text-lg font-medium overflow-y-auto custom-scroll">
          <li>
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <HomeIcon size={24} className="text-green-400" /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <InfoIcon size={24} className="text-purple-400" /> About
            </Link>
          </li>
          <li>
            <Link
              to="/affiliate"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <AffiliateIcon size={24} className="text-yellow-400" /> Affiliate
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <MailIcon size={24} className="text-red-400" /> Contact
            </Link>
          </li>

          {/* Mobile Google Translate Dropdown */}
          <li className="relative">
            <button
              onClick={toggleTranslateDropdown}
              className="flex items-center justify-between w-full gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-left"
            >
              <div className="flex items-center gap-3">
                <Globe size={24} className="text-cyan-400" /> Translate
              </div>
              <ChevronDown
                size={20}
                className={`transition-transform duration-200 ${
                  isTranslateDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {isTranslateDropdownOpen && (
              <div
                className="mt-2 w-full bg-gray-800 rounded-md shadow-xl overflow-hidden z-50 max-h-52 overflow-y-auto custom-scroll"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Critical: The hidden div for Google Translate widget. Must be present. */}
                <div
                  id="google_translate_element_mobile"
                  style={{ display: "none" }} // Use display:none for clean hiding
                />
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      closeMobileMenu();
                    }}
                    className="block w-full text-left px-6 py-2 text-base text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-150"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </li>

          {!user ? (
            <li>
              <Link
                to="/sign-in"
                onClick={closeMobileMenu}
                className="mt-6 flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-md"
              >
                <SignInIcon size={24} className="mr-2" /> Sign In
              </Link>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="mt-6 flex items-center justify-center w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300 shadow-md"
              >
                <SignOutIcon size={24} className="mr-2" /> Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-40"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
