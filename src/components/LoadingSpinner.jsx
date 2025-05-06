import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function LoadingSpinner() {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev === 3 ? 1 : prev + 1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const dots = ".".repeat(dotCount);

  const fadeInOutKeyframes = `
    @keyframes fadeInOut {
      0% { opacity: 0; }
      50% { opacity: 1; }
      100% { opacity: 0.95; }
    }

    @keyframes spin-slow {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{fadeInOutKeyframes}</style>
      <div
        style={{
          animation: "fadeInOut 0.6s ease-in-out",
        }}
        className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50"
      >
        <img
          src={logo}
          alt="Coinrise Logo"
          style={{
            animation: "spin-slow 2.5s linear infinite",
            height: "80px",
            width: "80px",
            borderRadius: "50%",
            marginBottom: "1rem",
          }}
        />
        <p className="text-white text-lg font-medium tracking-wide">
          Loading Coinrise{dots}
        </p>
      </div>
    </>
  );
}
