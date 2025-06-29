"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const title = "I'm";
const name = {
  firstName: "Sima",
  lastName: "Gholami",
};

const letterAnimation = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.08 },
  }),
  exit: (i: number) => ({
    opacity: 0,
    transition: { delay: i * 0.05 },
  }),
};

const nameAnimation = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: 1 + i * 0.05 },
  }),
  exit: (i: number) => ({
    opacity: 0,
    transition: { delay: i * 0.03 },
  }),
};

const paragraphAnimation = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" },
  }),
  exit: (i: number, total: number) => ({
    opacity: 0,
    y: -20,
    transition: { delay: (total - i) * 0.1, duration: 0.3, ease: "easeIn" },
  }),
};

const paragraphs = [
  <>
    Multidisciplinary designer with{" "}
    <strong className="font-bold">10 years</strong> of experience in{" "}
    <span className="text-yellow-400">branding</span>,{" "}
    <span className="text-yellow-400">creative direction</span>, and{" "}
    <span className="text-yellow-400">digital product design</span> — passionate
    about turning ideas into bold visual stories.
  </>,
  <>
    <strong>Expertise:</strong> I have very experience, designing brand
    identity, Product design managing, Directing social media, advertising
    projects, websites, web banners, content marketing materials, and more. If
    you need a fresh look for your brand or just want to refresh yourself,
    I&rsquo;m here to help!
  </>,
  <>
    I&rsquo;ve worked with everyone from big names like Schwarzkopf to emerging
    startups, always focusing on solutions that connect with people. If
    you&rsquo;re looking for a fresh perspective, let&rsquo;s create something
    meaningful together.
  </>,
  <>
    I work closely with my clients to understand their vision and goals, then I
    develop a custom solution to meet those needs.
  </>,
  <>
    <strong className="text-yellow-400">Tool Knowledge:</strong> I&rsquo;m
    Proficient in Adobe Photoshop, Illustrator, After Effects, InDesign, Figma,
    AI-powered design tools and other professional software applications.
  </>,
  <>
    <strong className="text-yellow-400">Passion:</strong> My passion is to
    create a strong and reputable brand that sells your product or service to
    your target audience.
  </>,
];

const AboutSection = () => {
  const totalParagraphs = paragraphs.length;

  return (
    <div className="w-full h-screen flex justify-center overflow-hidden relative">
      <div className="flex flex-col md:flex-row justify-center items-start space-y-6 md:space-y-0 md:space-x-6 max-w-7xl w-full mx-4">
        {/* سمت چپ - تصویر و نام */}
        <div className="relative p-4 pt-32 max-w-md w-full">
          {/* انیمیشن بردرها */}
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

          <div className="mx-auto flex flex-col space-y-2 relative z-10">
            <motion.h2
              className="text-3xl font-semibold flex items-start mx-1 md:mx-3 lg:mx-4"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={letterAnimation}
            >
              {[...title].map((char, index) => (
                <motion.span
                  key={`title-${index}`}
                  custom={index}
                  variants={letterAnimation}
                  className={
                    char === " "
                      ? "mx-1"
                      : "inline-block text-gray-300 text-3xl lg:text-4xl"
                  }
                >
                  {char}
                </motion.span>
              ))}
            </motion.h2>
            <motion.h2
              className="text-5xl md:text-5xl lg:text-6xl font-semibold flex justify-center flex-wrap"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={nameAnimation}
            >
              {[...name.firstName].map((char, index) => (
                <motion.span
                  key={`first-${index}`}
                  custom={index}
                  variants={nameAnimation}
                  className="inline-block text-white"
                >
                  {char}
                </motion.span>
              ))}
              <span className="mx-0.5" />
              {[...name.lastName].map((char, index) => (
                <motion.span
                  key={`last-${index}`}
                  custom={index + name.firstName.length}
                  variants={nameAnimation}
                  className="inline-block text-yellow-400"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h2>
          </div>

          {/* تصویر */}
          <div className="overflow-hidden mt-4 rounded-lg">
            <motion.div
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ clipPath: "inset(100% 0% 0% 0%)" }}
              transition={{ delay: 0.5, duration: 2.2, ease: "easeInOut" }}
            >
              <Image
                src="/image/landingPage/sima-brown-hair.jpeg"
                className="w-full object-cover"
                alt="Sima"
                width={800}
                height={600}
                priority
              />
            </motion.div>
          </div>
        </div>

        {/* سمت راست - متن بیوگرافی */}
        <motion.div
          className="max-w-lg w-full"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div
            id="bioText"
            className="max-h-[60vh] md:max-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-green-700 p-4"
            style={{ scrollbarWidth: "thin" }}
          >
            <div className="text-white text-xs md:text-[10px] lg:text-xs leading-relaxed md:pt-32 space-y-3 md:space-y-2 lg:space-y-3 lg:pt-28">
              {/* نوار زرد بالا */}
              <motion.div
                className="h-1 w-16 bg-yellow-500 rounded-full mb-2"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />

              {/* پاراگراف‌ها از آرایه رندر می‌شوند */}
              {paragraphs.map((content, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  variants={{
                    hidden: paragraphAnimation.hidden,
                    visible: paragraphAnimation.visible(i),
                    exit: paragraphAnimation.exit(i, totalParagraphs),
                  }}
                  className="text-white"
                >
                  {content}
                </motion.p>
              ))}

              {/* فاصله برای موبایل */}
              {[...Array(3)].map((_, i) => (
                <p key={"br" + i} className="block md:hidden">
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
