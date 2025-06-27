// ModalContent.tsx
import { carts } from "@/data/cart";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalContentProps {
  cart: (typeof carts)[0];
  onClose: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({ cart, onClose }) => {
  const [step, setStep] = useState(0);

  const isFirst = step === 0;

  const handleStopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  // ✅ Prevent body scroll when modal is open
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div
      className="w-full h-full grid grid-cols-12 bg-white text-black overflow-y-auto"
      onClick={handleStopPropagation}
    >
      <div className="col-span-12 relative flex items-center justify-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute z-50 top-6 right-6 cursor-pointer border bg-white text-black px-3 py-1 rounded hover:bg-red-500 hover:text-white transition"
        >
          ✕
        </button>

        {/* Large Background Number */}
        {isFirst && (
          <div className="hidden md:block absolute md:-top-35 md:-left-15 xl:-top-55 xl:-left-30 z-0">
            <p className="md:text-[300px] lg:text-[350px] xl:text-[450px] text-orange-950/30 letter-spacing">
              {cart.id.toString().padStart(2, "0")}
            </p>
          </div>
        )}

        {/* Mobile Header */}
        {!isFirst && (
          <div className="md:hidden absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-white z-30">
            <div className="text-lg font-semibold">
              <p>
                {String(step + 1).padStart(2, "0")} | {cart.title}
              </p>
            </div>
          </div>
        )}

        {/* Image Container */}
        <div
          className={`relative w-full h-full flex justify-center pt-0 md:pt-0 ${
            isFirst ? "items-start md:items-center" : "items-start"
          }`}
        >
          <div
            className={`relative w-full ${
              isFirst
                ? "h-[100vh] md:h-[70vh] lg:h-[80vh] xl:h-[95vh]"
                : "h-full"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={cart.images[step]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <Image
                  src={cart.images[step]}
                  alt={cart.title}
                  fill
                  priority
                  className={`transition-all duration-300 ${
                    isFirst
                      ? "object-contain object-top p-4 md:p-12 rounded-xl md:rounded-3xl"
                      : "object-cover object-top md:object-center"
                  }`}
                />
                {isFirst && (
                  <div className="flex flex-col absolute top-1/2 left-5 md:-bottom-5 md:left-5 lg:left-20 lg:bottom-14 xl:bottom-15 xl:left-50 max-w-[320px] text-left md:p-2 xl:p-4 rounded-md">
                    <h2 className="text-2xl md:text-3xl font-bold flex md:justify-start justify-center">
                      <span className="md:hidden">
                        {cart.id.toString().padStart(2, "0")} - {" "}
                      </span>
                      {cart.title}
                    </h2>
                    <div className="border-2 border-amber-400 w-28 mt-3 md:mt-3 xl:mt-5"></div>
                    {cart.description && (
                      <p className="mt-5 md:mt-5 xl:mt-10 text-sm xl:text-base text-gray-800 md:max-w-[270px] flex justify-center">
                        <span>{cart.description}</span>
                      </p>
                    )}
                    <p className="text-xs">{cart.year}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Bottom Description */}
        {!isFirst && cart.description && (
          <div className="md:hidden absolute bottom-0 left-0 w-full p-4 bg-white/80 text-sm">
            <h2 className="text-lg font-semibold md:block hidden">
              {cart.title}
            </h2>
            <p className="mt-1 text-gray-800">{cart.description}</p>
          </div>
        )}

        {/* Step Navigation Dots */}
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-3 z-40">
          {cart.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-5 h-2 rounded-full transition ${
                i === step
                  ? "bg-gray-800 scale-110"
                  : "bg-gray-500/40 hover:bg-gray-700/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
