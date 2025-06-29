"use client";

import { Logo } from "@/data/logo";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

interface ClientSectionProps {
  logos: Logo[];
}

const clipPathVariants = {
  hidden: {
    opacity: 0,
    clipPath: "inset(0 100% 0 0)",
  },
  visible: (i: number) => ({
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 1,
      ease: "easeInOut",
      delay: i * 0.1 + 0.2,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    clipPath: "inset(0 0 0 100%)",
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      delay: i * 0.05,
    },
  }),
};

function ClientSection({ logos }: ClientSectionProps) {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 md:space-y-0 md:space-x-10 mx-4">
        <div className="flex flex-col justify-center mb-4">
          <div className="flex flex-col justify-center items-center md:items-start md:mx-10 xl:mx-20">
            {/* عنوان با انیمیشن */}
            <div className="relative p-4 pt-12 max-w-xs w-full overflow-hidden">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                exit={{ height: 0, transition: { duration: 0.5, delay: 1.5 } }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute top-0 right-0 w-[2px] bg-white"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ width: 0, transition: { duration: 0.5, delay: 1 } }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute bottom-0 right-0 h-[2px] bg-white"
              />
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                exit={{ height: 0, transition: { duration: 0.5, delay: 0.5 } }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="absolute bottom-0 left-0 w-[2px] bg-white"
              />
              <div className="overflow-hidden">
                <motion.h2
                  className="text-3xl font-bold uppercase text-amber-300"
                  variants={clipPathVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={0}
                >
                  client & <br /> collaboration
                </motion.h2>
              </div>
            </div>
          </div>

          {/* لوگوها با انیمیشن کلیپ پس */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {logos.map((logo, logoIndex) => (
              <motion.div
                key={logoIndex}
                className="flex items-start justify-center overflow-hidden"
                variants={clipPathVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={logoIndex + 1} // چون h2 custom=0 داره
              >
                {logo.images.map((image, idx) => (
                  <Image
                    key={idx}
                    src={image}
                    alt={logo.title}
                    width={100}
                    height={100}
                    className="cursor-pointer object-contain w-60 md:w-44 lg:w-64"
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientSection;
