"use client";

import { useState, useEffect } from "react";

type ScrollDirection = "up" | "down" | "none";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>("none");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    // Only run on the client side
    if (typeof window === "undefined") return;

    const threshold = 10;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollTop =
        window.scrollY || document.documentElement.scrollTop;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (Math.abs(currentScrollTop - lastScrollTop) > threshold) {
            setScrollDirection(
              currentScrollTop > lastScrollTop ? "down" : "up"
            );
          }

          setScrollPosition(currentScrollTop);
          setLastScrollTop(currentScrollTop);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return { scrollDirection, scrollPosition };
}
