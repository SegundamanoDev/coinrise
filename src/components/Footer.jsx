import { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = function () {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      };

      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <footer className="text-center py-4">
      <div id="google_translate_element"></div>
      <p className="text-sm text-gray-500 mt-2">Powered by Google Translate</p>
    </footer>
  );
};

export default Footer;
