import { useEffect, useRef } from "react";

export default function StickySupportBar({ currentUser }) {
  // Use a ref to track if the script has been added to avoid re-adding
  const scriptAddedRef = useRef(false);

  useEffect(() => {
    const tawkToScriptSrc =
      "https://embed.tawk.to/680f253ee41bbb1918cda474/1iptiivur";
    const scriptId = "tawk-to-script";

    // Function to set Tawk.to user attributes
    const setUserAttributes = () => {
      // Ensure Tawk_API is defined before trying to use it
      if (window.Tawk_API) {
        if (currentUser && currentUser._id) {
          // Logged-in user: Set attributes for better chat persistence and context
          window.Tawk_API.setAttributes(
            {
              name:
                currentUser.fullName ||
                currentUser.username ||
                "Logged-in User",
              email: currentUser.email || `user_${currentUser._id}@example.com`,
              id: currentUser._id.toString(), // Ensure ID is a string, assuming it's _id from MongoDB
              // Add any other attributes you want to pass, e.g.:
              // plan: currentUser.subscriptionPlan,
              // signup_date: currentUser.createdAt,
            },
            function (error) {
              if (error) {
                console.error("Tawk.to setAttributes error:", error);
              } else {
                console.log(
                  "Tawk.to attributes set for logged-in user:",
                  currentUser._id
                );
              }
            }
          );
          // Optionally, show the widget if it was hidden for guests
          // window.Tawk_API.showWidget();
        } else {
          // Guest user: Clear any previous user attributes if user logs out,
          // or if this component is rendered for a guest.
          // Tawk.to will handle guest persistence automatically.
          window.Tawk_API.setAttributes({}, function (error) {
            // Clear attributes
            if (error) {
              console.error("Tawk.to clearAttributes error:", error);
            } else {
              console.log("Tawk.to attributes cleared for guest user.");
            }
          });
          // Optionally, hide the widget for guests if that's your desired behavior
          // window.Tawk_API.hideWidget();
        }
      } else {
        console.warn(
          "Tawk_API is not available when trying to set attributes."
        );
      }
    };

    // 1. Initialize Tawk.to global variables if they don't exist
    // This is part of Tawk.to's standard snippet
    if (!window.Tawk_API) {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
      // Assign the onLoad callback directly to Tawk_API
      window.Tawk_API.onLoad = function () {
        console.log("Tawk_API.onLoad triggered. Setting user attributes.");
        setUserAttributes();
      };
    } else {
      // If Tawk_API already exists (e.g., component re-mounted, or script loaded earlier),
      // re-apply the onLoad callback and try to set attributes immediately.
      // This handles cases where the script might have loaded before currentUser is available.
      window.Tawk_API.onLoad = function () {
        console.log("Tawk_API.onLoad re-assigned. Setting user attributes.");
        setUserAttributes();
      };
      // Also attempt to set attributes immediately if API is already ready
      if (window.Tawk_API.isTawkLoaded) {
        // Tawk.to might expose a flag like this
        console.log("Tawk_API already loaded. Setting attributes immediately.");
        setUserAttributes();
      }
    }

    // 2. Load Tawk.to script only once
    if (!scriptAddedRef.current && !document.getElementById(scriptId)) {
      const s1 = document.createElement("script");
      s1.id = scriptId;
      s1.async = true;
      s1.src = tawkToScriptSrc;
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      document.body.appendChild(s1);
      scriptAddedRef.current = true; // Mark script as added
    } else if (scriptAddedRef.current) {
      // If script was already added by this component, just ensure attributes are up-to-date
      // This handles `currentUser` changes after initial script load
      console.log(
        "Script already added. Updating Tawk.to attributes on currentUser change."
      );
      setUserAttributes();
    }

    // Cleanup: remove script when component unmounts
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript && document.body.contains(existingScript)) {
        document.body.removeChild(existingScript);
        scriptAddedRef.current = false; // Reset ref
        // Also clear Tawk_API globals on unmount if appropriate for your app's lifecycle
        // This can prevent issues if Tawk.to is only meant for specific pages
        // delete window.Tawk_API;
        // delete window.Tawk_LoadStart;
      }
    };
  }, [currentUser]); // Re-run effect if currentUser changes

  return (
    <div className="fixed bottom-8 right-6 z-50 hover:scale-110 transition"></div>
  );
}
