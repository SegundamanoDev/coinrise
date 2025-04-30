import { useEffect } from "react";
import { MessageCircle, PhoneCall } from "lucide-react";

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
    <div className="fixed bottom-0 left-0 w-full z-50  border-t shadow-lg flex justify-between items-center px-4 py-3 md:px-8">
      {/* WhatsApp */}
      <a
        href="https://wa.me/2347078588361"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
      >
        <PhoneCall className="w-5 h-5" />
        <span>WhatsApp Support</span>
      </a>

      {/* Tawk.to Chat Status (label only) */}
      <div className="flex items-center space-x-2 text-blue-600 font-medium">
        <MessageCircle className="w-5 h-5" />
        <span>Live Chat Available</span>
      </div>
    </div>
  );
}
