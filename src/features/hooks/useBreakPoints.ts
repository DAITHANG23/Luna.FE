"use client";
import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const handler = () => setMatches(media.matches);
    handler();
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [query]);
  return matches;
};
const useBreakPoints = () => {
  const isDesktopSize = useMediaQuery("(min-width: 1024px)");
  const isTableSize = useMediaQuery("(min-width: 719px)");
  const isMobileSize = useMediaQuery("(max-width: 719px)");

  return { isDesktopSize, isTableSize, isMobileSize };
};

export default useBreakPoints;
