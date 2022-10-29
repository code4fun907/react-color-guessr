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
      <div className="fixed inset-0 opacity-90 flex flex-col items-center justify-center overflow-hidden z-[999] p-10">
        <button onClick={handleClose}>Close</button>
        <div className="w-3/4 h-3/4 flex items-center justify-center">
          {children}
        </div>
      </div>
    </Portal>
  );
};
