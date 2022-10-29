import { MouseEventHandler, useEffect } from "react";
import { Portal } from "./Portal";

export interface IModalProps {
  children: JSX.Element;
  isOpen: boolean;
  handleClose: any;
}

export const Modal: React.FC<IModalProps> = ({
  children,
  isOpen,
  handleClose,
}) => {
  if (!isOpen) return null;

  // close by hitting <esc> key
  useEffect(() => {
    const closeOnEscapeKey = (e: any) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  return (
    <Portal wrapperId="portal-modal-container">
      <>
        <div
          className="bg-black w-screen h-screen absolute top-0 bottom-0 right-0 left-0 opacity-20 pointer-events-auto"
          onClick={handleClose}
        ></div>
        <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden z-[999] p-10 pointer-events-none">
          <div className="w-1/3 h-1/5 flex items-center justify-center bg-white rounded-lg px-10">
            {children}
          </div>
        </div>
      </>
    </Portal>
  );
};
