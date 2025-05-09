import { useEffect } from "react";

export default function StickySupportBar() {
  useEffect(() => {
    // Load Tawk.to script once on mount
    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = "https://embed.tawk.to/680f253ee41bbb1918cda474/1iptiivur";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    document.body.appendChild(s1);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 hover:scale-110 transition"></div>
  );
}
