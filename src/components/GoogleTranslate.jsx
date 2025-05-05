import React, { useEffect, useState } from "react";

const languages = [
  { label: "Afrikaans", value: "af" },
  { label: "Albanian", value: "sq" },
  { label: "Amharic", value: "am" },
  { label: "Arabic", value: "ar" },
  { label: "Armenian", value: "hy" },
  { label: "Azerbaijani", value: "az" },
  { label: "Basque", value: "eu" },
  { label: "Belarusian", value: "be" },
  { label: "Bengali", value: "bn" },
  { label: "Bosnian", value: "bs" },
  { label: "Bulgarian", value: "bg" },
  { label: "Catalan", value: "ca" },
  { label: "Cebuano", value: "ceb" },
  { label: "Chinese (Simplified)", value: "zh-CN" },
  { label: "Chinese (Traditional)", value: "zh-TW" },
  { label: "Corsican", value: "co" },
  { label: "Croatian", value: "hr" },
  { label: "Czech", value: "cs" },
  { label: "Danish", value: "da" },
  { label: "Dutch", value: "nl" },
  { label: "English", value: "en" },
  { label: "Esperanto", value: "eo" },
  { label: "Estonian", value: "et" },
  { label: "Finnish", value: "fi" },
  { label: "French", value: "fr" },
  { label: "Frisian", value: "fy" },
  { label: "Galician", value: "gl" },
  { label: "Georgian", value: "ka" },
  { label: "German", value: "de" },
  { label: "Greek", value: "el" },
  { label: "Gujarati", value: "gu" },
  { label: "Haitian Creole", value: "ht" },
  { label: "Hausa", value: "ha" },
  { label: "Hawaiian", value: "haw" },
  { label: "Hebrew", value: "iw" },
  { label: "Hindi", value: "hi" },
  { label: "Hmong", value: "hmn" },
  { label: "Hungarian", value: "hu" },
  { label: "Icelandic", value: "is" },
  { label: "Igbo", value: "ig" },
  { label: "Indonesian", value: "id" },
  { label: "Irish", value: "ga" },
  { label: "Italian", value: "it" },
  { label: "Japanese", value: "ja" },
  { label: "Javanese", value: "jw" },
  { label: "Kannada", value: "kn" },
  { label: "Kazakh", value: "kk" },
  { label: "Khmer", value: "km" },
  { label: "Kinyarwanda", value: "rw" },
  { label: "Korean", value: "ko" },
  { label: "Kurdish", value: "ku" },
  { label: "Kyrgyz", value: "ky" },
  { label: "Lao", value: "lo" },
  { label: "Latin", value: "la" },
  { label: "Latvian", value: "lv" },
  { label: "Lithuanian", value: "lt" },
  { label: "Luxembourgish", value: "lb" },
  { label: "Macedonian", value: "mk" },
  { label: "Malagasy", value: "mg" },
  { label: "Malay", value: "ms" },
  { label: "Malayalam", value: "ml" },
  { label: "Maltese", value: "mt" },
  { label: "Maori", value: "mi" },
  { label: "Marathi", value: "mr" },
  { label: "Mongolian", value: "mn" },
  { label: "Myanmar (Burmese)", value: "my" },
  { label: "Nepali", value: "ne" },
  { label: "Norwegian", value: "no" },
  { label: "Nyanja (Chichewa)", value: "ny" },
  { label: "Odia", value: "or" },
  { label: "Pashto", value: "ps" },
  { label: "Persian", value: "fa" },
  { label: "Polish", value: "pl" },
  { label: "Portuguese", value: "pt" },
  { label: "Punjabi", value: "pa" },
  { label: "Romanian", value: "ro" },
  { label: "Russian", value: "ru" },
  { label: "Samoan", value: "sm" },
  { label: "Scots Gaelic", value: "gd" },
  { label: "Serbian", value: "sr" },
  { label: "Sesotho", value: "st" },
  { label: "Shona", value: "sn" },
  { label: "Sindhi", value: "sd" },
  { label: "Sinhala", value: "si" },
  { label: "Slovak", value: "sk" },
  { label: "Slovenian", value: "sl" },
  { label: "Somali", value: "so" },
  { label: "Spanish", value: "es" },
  { label: "Sundanese", value: "su" },
  { label: "Swahili", value: "sw" },
  { label: "Swedish", value: "sv" },
  { label: "Tagalog (Filipino)", value: "tl" },
  { label: "Tajik", value: "tg" },
  { label: "Tamil", value: "ta" },
  { label: "Tatar", value: "tt" },
  { label: "Telugu", value: "te" },
  { label: "Thai", value: "th" },
  { label: "Turkish", value: "tr" },
  { label: "Turkmen", value: "tk" },
  { label: "Ukrainian", value: "uk" },
  { label: "Urdu", value: "ur" },
  { label: "Uyghur", value: "ug" },
  { label: "Uzbek", value: "uz" },
  { label: "Vietnamese", value: "vi" },
  { label: "Welsh", value: "cy" },
  { label: "Xhosa", value: "xh" },
  { label: "Yiddish", value: "yi" },
  { label: "Yoruba", value: "yo" },
  { label: "Zulu", value: "zu" },
];

const includedLanguages = languages.map((lang) => lang.value).join(",");

function googleTranslateElementInit() {
  new window.google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: includedLanguages,
    },
    "google_translate_element"
  );
}

const GoogleTranslate = () => {
  const [selectedLang, setSelectedLang] = useState("en");

  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = googleTranslateElementInit;

    // Check cookie for preferred language
    const lang = getPrefLangCookie();
    if (lang) setSelectedLang(lang);
  }, []);

  const onChange = (value) => {
    setSelectedLang(value);
    const element = document.querySelector(".goog-te-combo");
    if (element) {
      element.value = value;
      element.dispatchEvent(new Event("change"));
    }
    // Optional: Save in cookie
    document.cookie = `googtrans=/en/${value};path=/;`;
  };

  return (
    <div className="w-full">
      <div
        id="google_translate_element"
        style={{ visibility: "hidden", width: 1, height: 1 }}
      ></div>
      <LanguageSelector onChange={onChange} value={selectedLang} />
    </div>
  );
};

const LanguageSelector = ({ onChange, value }) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      value={value}
      className="bg-[#111827]"
    >
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};

function getPrefLangCookie() {
  const match = document.cookie.match(/(?:^|; )googtrans=\/en\/([^;]*)/);
  return match ? match[1] : "en";
}

export default GoogleTranslate;
