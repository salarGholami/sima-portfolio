"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import HomeSection from "@/sections/HomeSection";
import AboutMe from "@/sections/AboutSection"; // این مسیر رو با مسیر درست پروژه‌ات اصلاح کن
import ContactSection from "@/sections/ContactSection";

const sections = ["home", "about", "contact"] as const;
const components = {
  home: HomeSection,
  about: AboutMe,
  contact: ContactSection,
};

type Section = (typeof sections)[number];

export default function ScrollRouter() {
  const pathname = usePathname();
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(() => {
    const idx = sections.findIndex((s) => pathname.includes(s));
    return idx === -1 ? 0 : idx;
  });
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [isScrolling, setIsScrolling] = useState(false);

  const touchStartY = useRef<number | null>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const scrollDelta = useRef(0);

  const SCROLL_THRESHOLD = 400;

  const CurrentComponent = components[sections[activeIndex]];

  useEffect(() => {
    const idx = sections.findIndex((s) => pathname.includes(s));
    if (idx !== -1 && idx !== activeIndex) {
      setDirection(idx > activeIndex ? "down" : "up");
      setActiveIndex(idx);
    }
  }, [pathname, activeIndex]);

  const changeSection = useCallback(
    (newIndex: number, dir: "up" | "down") => {
      if (newIndex < 0 || newIndex >= sections.length || isScrolling) return;

      setDirection(dir);
      setIsScrolling(true);
      router.push(`/${sections[newIndex]}`);

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
        scrollDelta.current = 0;
      }, 2000);
    },
    [router, isScrolling]
  );

  const handleAccumulatedScroll = useCallback(
    (deltaY: number) => {
      scrollDelta.current += deltaY;

      if (Math.abs(scrollDelta.current) >= SCROLL_THRESHOLD) {
        if (scrollDelta.current > 0 && activeIndex < sections.length - 1) {
          changeSection(activeIndex + 1, "down");
        } else if (scrollDelta.current < 0 && activeIndex > 0) {
          changeSection(activeIndex - 1, "up");
        }
        scrollDelta.current = 0;
      }
    },
    [activeIndex, changeSection]
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      if (!isScrolling) handleAccumulatedScroll(e.deltaY);
    },
    [handleAccumulatedScroll, isScrolling]
  );

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (!isScrolling) handleAccumulatedScroll(deltaY);
      touchStartY.current = null;
    },
    [handleAccumulatedScroll, isScrolling]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isScrolling) return;

      if (e.key === "ArrowDown" && activeIndex < sections.length - 1) {
        changeSection(activeIndex + 1, "down");
      } else if (e.key === "ArrowUp" && activeIndex > 0) {
        changeSection(activeIndex - 1, "up");
      }
    },
    [isScrolling, activeIndex, changeSection]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [handleWheel, handleTouchStart, handleTouchEnd, handleKeyDown]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeIndex}
        initial={{ y: direction === "down" ? 5 : -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: direction === "down" ? -5 : 5, opacity: 0 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        {/* به AboutMe prop خروجی جهت انیمیشن معکوس رو میدیم */}
        <CurrentComponent exitDirection={direction} />
      </motion.div>
    </AnimatePresence>
  );
}
