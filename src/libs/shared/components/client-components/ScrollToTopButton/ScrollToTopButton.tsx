"use client";
import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`bg-primary/80 hover:bg-primary/90 fixed right-6 bottom-6 flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md transition-opacity duration-300 ${
        showButton ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{ zIndex: 10000 }}
    >
      <ArrowUpIcon width={16} height={16} />
    </button>
  );
}
