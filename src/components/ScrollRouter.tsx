"use client";

import React, { useEffect, useState, useRef, FC } from "react";
import { AnimatePresence } from "framer-motion";

import HomeSection from "@/sections/HomeSection";
import AboutMe from "@/sections/AboutSection";
import ContactSection from "@/sections/ContactSection";

const sections = ["home", "about", "contact"] as const;
type SectionKey = (typeof sections)[number];

const components: Record<SectionKey, FC<{ isActive: boolean }>> = {
  home: HomeSection,
  about: AboutMe,
  contact: ContactSection,
};

const SCROLL_TRANSITION_DURATION = 800;

const ScrollRouter: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const activeIndexRef = useRef<number>(activeIndex);
  const isTransitioningRef = useRef<boolean>(isTransitioning);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  const startTransitionToIndex = (newIndex: number) => {
    if (isTransitioningRef.current) return;
    if (newIndex === activeIndexRef.current) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setActiveIndex(newIndex);
      setIsTransitioning(false);
    }, SCROLL_TRANSITION_DURATION);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioningRef.current) return;

      if (e.deltaY > 0 && activeIndexRef.current < sections.length - 1) {
        startTransitionToIndex(activeIndexRef.current + 1);
      } else if (e.deltaY < 0 && activeIndexRef.current > 0) {
        startTransitionToIndex(activeIndexRef.current - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      if (isTransitioningRef.current) return;

      if (deltaY > 50 && activeIndexRef.current < sections.length - 1) {
        startTransitionToIndex(activeIndexRef.current + 1);
      } else if (deltaY < -50 && activeIndexRef.current > 0) {
        startTransitionToIndex(activeIndexRef.current - 1);
      }

      touchStartY.current = null;
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const ActiveComponent = components[sections[activeIndex]];

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <AnimatePresence mode="wait">
        <ActiveComponent key={sections[activeIndex]} isActive />
      </AnimatePresence>
    </div>
  );
};

export default ScrollRouter;
