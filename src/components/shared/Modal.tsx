import { AnimatePresence, motion } from "framer-motion";
import { modalVariants } from "../../hooks/useAnimation";

interface ModalProps {
  onClose: () => void;
  width: string;
  height?: number;
  className: string;
  modalIsOpen: boolean;
  children: React.ReactNode;
}

const Modal = ({
  onClose,
  width,
  height,
  modalIsOpen,
  children,
  className,
}: ModalProps) => {


  return (
    <>
      <AnimatePresence>
        {modalIsOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            className={`fixed overflow-hidden top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 flex items-center justify-center z-20`}
            onClick={onClose}
          >
            <motion.div
              className={`bg-background rounded-lg relative p-3 max-h-screen overflow-y-auto ${className}`}
              onClick={(e) => e.stopPropagation()}
              style={{ width: width, height: height }}
              initial={{ y: "100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "100vh" }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
