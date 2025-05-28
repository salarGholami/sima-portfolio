"use client";

import { ArrowDownIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { motion } from "framer-motion";

const headerTitle = {
  description: "Weaver of creativity and design",
};

const footerTitle = {
  description: "scroll down to watch my portfolio",
};

const titleBody = {
  span: {
    firstName: "Sima",
    lastName: "Gholami",
  },
};

const mainBody = {
  highlight: "Art Director",
  rest: "& Product Design Manager",
};

const HomeSection: React.FC = () => {
  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.3, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <Image
        src="/image/landingPage/portfolio.jpg"
        alt="Sima holding a lightbulb"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />

      <div className="w-full h-screen flex justify-center overflow-hidden relative">
        <div className="flex flex-col md:flex-row justify-end md:justify-center items-end md:space-y-0 md:space-x-10 w-full mx-4">
          {/* سمت چپ - تصویر و نام */}
          <div className="relative p-4 max-w-md w-full">
            {/* بردر راست */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              exit={{
                height: 0,
                transition: { duration: 0.5, delay: 1.4 },
              }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute bottom-0 right-0 w-[2px] bg-white origin-top"
            />

            {/* بردر بالا */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              exit={{
                width: 0,
                transition: { duration: 0.5, delay: 0.9 },
              }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute top-0 right-0 h-[2px] bg-white origin-left"
            />

            {/* بردر چپ */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              exit={{
                height: 0,
                transition: { duration: 0.5, delay: 0.4 },
              }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="absolute top-0 left-0 w-[2px] bg-white origin-bottom"
            />

            <div className="relative z-10 text-left space-y-4">
              <motion.h3
                className="text-xs sm:text-sm uppercase tracking-widest text-gray-300"
                initial="hidden"
                animate="visible"
                exit={{
                  opacity: 0,
                  transition: { duration: 0.4, delay: 0 },
                }}
                custom={0}
                variants={textVariants}
              >
                {headerTitle.description.toUpperCase()}
              </motion.h3>

              <motion.h1
                className="text-5xl sm:text-6xl py-2 lg:text-6xl xl:text-7xl font-semibold leading-tight"
                initial="hidden"
                animate="visible"
                exit={{
                  opacity: 0,
                  transition: { duration: 0.4, delay: 0.1 },
                }}
                custom={1}
                variants={textVariants}
              >
                {titleBody.span.firstName} <br /> {titleBody.span.lastName}
              </motion.h1>

              <motion.h2
                className="sm:text-xl xl:text-3xl font-semibold"
                initial="hidden"
                animate="visible"
                exit={{
                  opacity: 0,
                  transition: { duration: 0.4, delay: 0.15 },
                }}
                custom={2}
                variants={textVariants}
              >
                <span className="text-yellow-400">{mainBody.highlight}</span>
                <br />
                {mainBody.rest}
              </motion.h2>

              <motion.p
                className="flex justify-between text-xs sm:text-sm text-gray-300 pt-6 pb-20"
                initial="hidden"
                animate="visible"
                exit={{
                  opacity: 0,
                  transition: { duration: 0.4, delay: 0.2 },
                }}
                custom={3}
                variants={textVariants}
              >
                {footerTitle.description.toUpperCase()}
                <ArrowDownIcon className="text-yellow-400 w-9 h-9" />
              </motion.p>
            </div>
          </div>

          {/* فضای خالی در سمت راست برای ساختار متقارن در نمایشگرهای بزرگ */}
          <div className="relative p-4 pt-32 max-w-md w-full hidden md:block"></div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
