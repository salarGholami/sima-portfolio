"use client";

import React, {
  useEffect,
  useState,
  useRef,
  FC,
  useCallback,
  useMemo,
} from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import HomeSection from "@/sections/HomeSection";
import AboutMe from "@/sections/AboutSection";
import Hi from "@/sections/ClientSection";
import ReseumeSection from "@/sections/ReseumeSection";

const sections = ["home", "about", "contact", "hi"] as const;
type SectionKey = (typeof sections)[number];

const components: Record<SectionKey, FC<{ isActive: boolean }>> = {
  home: HomeSection,
  about: AboutMe,
  contact: ReseumeSection,

  hi: Hi,
};

const SCROLL_THRESHOLD = 2;
const TOUCH_DELTA_THRESHOLD = 120;
const WHEEL_DELTA_THRESHOLD = 30;
const DEBOUNCE_DELAY = 300;
const TRANSITION_LOCK_DURATION = 1000;

const ScrollRouter: FC = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  const isLocked = useRef(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const touchStartY = useRef<number | null>(null);

  const hasReachedScrollEnd = () => {
    const container = containerRef.current;
    return container
      ? Math.abs(
          container.scrollTop + container.clientHeight - container.scrollHeight
        ) <= SCROLL_THRESHOLD
      : false;
  };

  const hasReachedScrollStart = () => {
    const container = containerRef.current;
    return container ? container.scrollTop <= SCROLL_THRESHOLD : false;
  };

  const debounce = (func: () => void, delay: number) => {
    if (debounceTimeout.current) return;
    debounceTimeout.current = setTimeout(() => {
      func();
      debounceTimeout.current = null;
    }, delay);
  };

  const startTransitionToIndex = useCallback(
    (newIndex: number) => {
      if (
        isLocked.current ||
        newIndex === activeIndexRef.current ||
        newIndex < 0 ||
        newIndex >= sections.length
      )
        return;

      isLocked.current = true;
      setActiveIndex(newIndex);

      setTimeout(() => {
        setVisibleIndex(newIndex);
        router.push(`#${sections[newIndex]}`);
        isLocked.current = false;
      }, TRANSITION_LOCK_DURATION);
    },
    [router]
  );

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const index = sections.findIndex((s) => s === hash);
    if (index >= 0) {
      setActiveIndex(index);
      setVisibleIndex(index);
    }
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isLocked.current || Math.abs(e.deltaY) < WHEEL_DELTA_THRESHOLD)
        return;
      debounce(() => {
        if (e.deltaY > 0 && hasReachedScrollEnd())
          startTransitionToIndex(activeIndexRef.current + 1);
        else if (e.deltaY < 0 && hasReachedScrollStart())
          startTransitionToIndex(activeIndexRef.current - 1);
      }, DEBOUNCE_DELAY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null || isLocked.current) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (deltaY > TOUCH_DELTA_THRESHOLD && hasReachedScrollEnd()) {
        startTransitionToIndex(activeIndexRef.current + 1);
      } else if (deltaY < -TOUCH_DELTA_THRESHOLD && hasReachedScrollStart()) {
        startTransitionToIndex(activeIndexRef.current - 1);
      }
      touchStartY.current = null;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLocked.current) return;
      if (e.key === "ArrowDown" && hasReachedScrollEnd())
        startTransitionToIndex(activeIndexRef.current + 1);
      else if (e.key === "ArrowUp" && hasReachedScrollStart())
        startTransitionToIndex(activeIndexRef.current - 1);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [startTransitionToIndex]);

  const ActiveComponent = useMemo(
    () => components[sections[visibleIndex]],
    [visibleIndex]
  );

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-y-auto relative bg-black"
    >
      <AnimatePresence mode="wait">
        <ActiveComponent key={sections[visibleIndex]} isActive />
      </AnimatePresence>
    </div>
  );
};

export default ScrollRouter;
