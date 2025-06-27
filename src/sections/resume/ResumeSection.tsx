"use client";

import { ResumeBoxItemType } from "@/types/resume";
import { FC } from "react";
import ResumeBox from "./ResumeBox";



const workExperience: ResumeBoxItemType[] = [
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

const education: ResumeBoxItemType[] = [
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

const achievements: ResumeBoxItemType[] = [
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

const skillsAsTimelineItems: ResumeBoxItemType[] = skills.map((skill) => ({
  title: skill,
}));

// ✅ ResumeGrid
const ResumeSection: FC = () => {
  const baseDelay = 0;
  const delayStep = 0.3;

  return (
    <section className="w-full min-h-screen flex justify-center items-start px-4 py-8 bg-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-x-56 max-w-5xl w-full">
        <ResumeBox
          title="Work Experience"
          items={workExperience}
          delay={baseDelay + delayStep * 0}
        />
        <ResumeBox
          title="Achievement"
          items={achievements}
          delay={baseDelay + delayStep * 1}
        />
        <ResumeBox
          title="Education"
          items={education}
          delay={baseDelay + delayStep * 2}
        />
        <ResumeBox
          title="Skills"
          items={skillsAsTimelineItems}
          delay={baseDelay + delayStep * 3}
        />
      </div>
    </section>
  );
};

export default ResumeSection;
