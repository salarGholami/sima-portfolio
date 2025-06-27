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

import Client from "@/sections/client/Client";
import Home from "@/sections/home/Home";
import Resume from "@/sections/resume/Resume";
import AboutMe from "@/sections/about/AboutMe";
import Contents from "@/sections/contents/Contents";

const sections = ["home", "about", "resume", "client", "contents"] as const;
type SectionKey = (typeof sections)[number];

const components: Record<SectionKey, FC<{ isActive: boolean }>> = {
  home: Home,
  about: AboutMe,
  resume: Resume,
  client: Client,
  contents: Contents,
};

const TOUCH_DELTA_THRESHOLD = 150; // افزایش حساسیت برای تاچ
const WHEEL_DELTA_THRESHOLD = 100; // افزایش حساسیت برای چرخ اسکرول
const DEBOUNCE_DELAY = 300;
const TRANSITION_LOCK_DURATION = 1500; // افزایش زمان قفل انتقال

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
    if (!container) return false;

    const scrollBottom = container.scrollTop + container.clientHeight;
    return scrollBottom >= container.scrollHeight - 10; // حساسیت کمتر
  };

  const hasReachedScrollStart = () => {
    const container = containerRef.current;
    if (!container) return false;

    return container.scrollTop <= 10; // حساسیت کمتر
  };

  // debounce اصلاح شده برای لغو timeout قبلی
  const debounce = (func: () => void, delay: number) => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
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
        if (e.deltaY > 0 && hasReachedScrollEnd()) {
          startTransitionToIndex(activeIndexRef.current + 1);
        } else if (e.deltaY < 0 && hasReachedScrollStart()) {
          startTransitionToIndex(activeIndexRef.current - 1);
        }
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
      if (e.key === "ArrowDown" && hasReachedScrollEnd()) {
        startTransitionToIndex(activeIndexRef.current + 1);
      } else if (e.key === "ArrowUp" && hasReachedScrollStart()) {
        startTransitionToIndex(activeIndexRef.current - 1);
      }
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
