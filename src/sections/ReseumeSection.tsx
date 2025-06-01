"use client";

import { FC, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

//  انواع داده‌ها
type TimelineItem = {
  year?: string;
  title: string;
  subtitle?: string;
};

const workExperience: TimelineItem[] = [
  {
    year: "2014 – 2019",
    title: "MODEKEY – Fashion Company",
    subtitle: "Graphic Designer and event planner",
  },
  {
    year: "2019 – 2021",
    title: "FIXSO – Advertising Agency",
    subtitle: "Art Director, Designer, Creative and Advertising Consultant",
  },
  {
    year: "2021 – 2022",
    title: "DIGIKALA Marketplace",
    subtitle: "Senior Graphic Designer at DIGISTYLE",
  },
  {
    year: "2022 – 2023",
    title: "IRANTALENT HR Company",
    subtitle: "Design Lead at KARDIX",
  },
  {
    year: "2024 – 2025",
    title: "APSAN Fintech Company ( ASAN PARDAKHT )",
    subtitle: "Product Design Manager",
  },
];

const education: TimelineItem[] = [
  {
    year: "2012 – 2014",
    title: "Vocational Diploma – Visual Communication",
    subtitle: "Graphic Design – GOLSHAN vocational school",
  },
  {
    year: "2014 – 2016",
    title: "Associate’s degree – Visual Communication",
    subtitle: "Graphic Design – Public University of Karaj",
  },
  {
    year: "2016 – 2018",
    title: "Bachelor’s degree – Visual Communication",
    subtitle: "Graphic Design – SOORE Art University of Tehran",
  },
  {
    year: "2021",
    title: "Presentation Design Course",
    subtitle: "INVERSE Online School",
  },
  {
    year: "2021",
    title: "Creativity Course",
    subtitle: "INVERSE Online School",
  },
  {
    year: "2024",
    title: "Comprehensive UI and UX Course",
    subtitle: "INVERSE Online School",
  },
];

const achievements: TimelineItem[] = [
  {
    year: "2018",
    title: "Elected to the scientific festival of visual arts of Iran",
  },
  {
    year: "2018",
    title: "Participation in the group exhibition entitled: At nine o’clock",
  },
  {
    year: "2018",
    title:
      "Participation in the group exhibition entitled: Visual and written approaches of the Scientific Association of Visual Arts of Iran",
  },
];

const skills: string[] = [
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe After Effects",
  "Adobe InDesign",
  "Figma",
  "AI Generator Tools",
];

const skillsAsTimelineItems: TimelineItem[] = skills.map((skill) => ({
  title: skill,
}));


// ✅ TimelineBox
const TimelineBox: FC<{
  title: string;
  items: TimelineItem[];
  delay: number;
}> = ({ title, items, delay }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstDotRef = useRef<HTMLDivElement>(null);
  const lastDotRef = useRef<HTMLDivElement>(null);
  const [lineStyle, setLineStyle] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const updateLine = () => {
      if (firstDotRef.current && lastDotRef.current && containerRef.current) {
        const containerTop = containerRef.current.getBoundingClientRect().top;
        const firstTop = firstDotRef.current.getBoundingClientRect().top;
        const lastTop = lastDotRef.current.getBoundingClientRect().top;
        const top =
          firstTop - containerTop + firstDotRef.current.offsetHeight / 2;
        const bottom =
          lastTop - containerTop + lastDotRef.current.offsetHeight / 2;
        setLineStyle({ top, height: bottom - top });
      }
    };

    updateLine();
    window.addEventListener("resize", updateLine);
    return () => window.removeEventListener("resize", updateLine);
  }, [items]);

  return (
    <motion.div
      ref={containerRef}
      className="relative text-white rounded-xl shadow-lg p-4 w-full"
      variants={{
        initial: { opacity: 0 ,y:-50},
        animate: { opacity: 1,y:0 },
        exit: { opacity: 0 },
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ delay, duration: 0.5 }}
    >
      <h2 className="text-sm font-bold ml-22 uppercase border-b-2 border-yellow-400 pb-2 mb-4">
        {title}
      </h2>

      <div
        className="absolute left-[89px] w-[2px] bg-white z-0"
        style={{ top: lineStyle.top, height: lineStyle.height }}
      />

      <ul className="space-y-2 relative z-10">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2 items-start">
            <div className="text-[10px] font-semibold text-right w-[60px] mt-[6px]">
              {item.year ?? "\u00A0"}
            </div>
            <div className="relative flex justify-center">
              <div
                className="w-3 h-3 bg-orange-400 rounded-full my-1 border-[3px] border-black"
                ref={
                  index === 0
                    ? firstDotRef
                    : index === items.length - 1
                    ? lastDotRef
                    : null
                }
              />
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-semibold">{item.title}</div>
              {item.subtitle && (
                <div className="text-yellow-400 text-[10px]">
                  {item.subtitle}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

// ✅ ResumeGrid
const ReseumeSection: FC = () => {
  const baseDelay = 0;
  const delayStep = 0.3;

  return (
    <section className="w-full min-h-screen flex justify-center items-start px-4 py-8 bg-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-x-56 max-w-5xl w-full">
        <TimelineBox
          title="Work Experience"
          items={workExperience}
          delay={baseDelay + delayStep * 0}
        />
        <TimelineBox
          title="Achievement"
          items={achievements}
          delay={baseDelay + delayStep * 1}
        />
        <TimelineBox
          title="Education"
          items={education}
          delay={baseDelay + delayStep * 2}
        />
        <TimelineBox
          title="Skills"
          items={skillsAsTimelineItems}
          delay={baseDelay + delayStep * 3}
        />
      </div>
    </section>
  );
};

export default ReseumeSection;
