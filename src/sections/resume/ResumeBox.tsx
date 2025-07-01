import { FC, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ResumeBoxItemType } from "@/types/resume";

const ResumeBox: FC<{
  title: string;
  items: ResumeBoxItemType[];
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
        initial: { opacity: 0, y: -50 },
        animate: { opacity: 1, y: 0 },
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
              <div className="text-[11px] ">
                <span className="font-bold">{item.companyName}</span>  {" "}
                <span className="text-gray-100">{item.title}</span>
              </div>
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

export default ResumeBox;
