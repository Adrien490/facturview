import { type Variants } from "framer-motion";

export const buttonVariants: Variants = {
  rest: { scale: 1 },
  tap: { scale: 1 },
  hover:{scale: 1.1},
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};
export const tapAnimation = {
  scale: 0.95,
  boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
};

export const listVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.05 },
  }),
};

export const scaleAnimation = {
  initial: { scale: 1 },
  animate: { scale: 1.1 },
  transition: { duration: 0.2 },
};
export const modalVariants = {
  visible: {
    opacity: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      backgroundColor: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
  },
  hidden: {
    opacity: 0,
    backgroundColor: "rgba(0, 0, 0, 0)",
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      backgroundColor: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
  },
};
