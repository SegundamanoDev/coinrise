// import { useEffect } from "react";

// const GoogleTranslate = () => {
//   useEffect(() => {
//     if (!document.getElementById("google-translate-script")) {
//       const script = document.createElement("script");
//       script.id = "google-translate-script";
//       script.src =
//         "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//       script.async = true;
//       document.body.appendChild(script);
//     }

//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         { pageLanguage: "en" },
//         "google_translate_element"
//       );
//     };
//   }, []);

//   return (
//     <div>
//       <div id="google_translate_element"></div>
//     </div>
//   );
// };

// export default GoogleTranslate;
