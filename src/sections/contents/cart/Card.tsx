import { Cart } from "@/data/cart";
import Image from "next/image";
import { motion } from "framer-motion";

interface CardProps {
  cart: Cart;
  onClick: () => void;
  index: number;
}

// انیمیشن برای تصویر و متن
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

const Card: React.FC<CardProps> = ({ cart, onClick, index }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-col items-center w-full max-w-[220px] sm:max-w-[240px] space-y-3"
    >
      <div className="flex flex-col items-start w-full space-y-2">
        <div className="flex h-56 w-full">
          {/* شماره کارت */}
          <motion.span
            className="text-3xl lg:text-5xl border-b-2 text-gray-800 border-yellow-500 p-1 mr-2 self-end"
            variants={clipPathVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={index}
          >
            {cart.id.toString().padStart(2, "0")}
          </motion.span>

          {/* تصویر */}
          <motion.div
            className="relative w-full h-full overflow-hidden rounded-xl"
            variants={clipPathVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={index}
          >
            <Image
              src={cart.images[0]}
              alt={cart.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* متن و شرکت */}
        <motion.div
          className="flex flex-col text-sm"
          variants={clipPathVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={index}
        >
          <span className="font-semibold text-gray-800">{cart.title}</span>
          <span className="text-[10px] uppercase text-gray-600">
            {cart.company}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default Card;
