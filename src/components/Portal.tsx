import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface IPortalProps {
  wrapperId: string;
  children: JSX.Element;
}

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

export const Portal: React.FC<IPortalProps> = ({ children, wrapperId }) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement>();

  // utilizing LayoutEffect because of direct DOM manipulation
  useLayoutEffect(() => {
    let elem = document.getElementById(wrapperId);
    let systemCreated = false;

    if (!elem) {
      systemCreated = true;
      elem = createWrapperAndAppendToBody(wrapperId);
    }

    setWrapperElement(elem);

    // cleanup DOM when Portal is unmounted
    return () => {
      if (systemCreated && elem?.parentNode) {
        elem.parentNode.removeChild(elem);
      }
    };
  }, [wrapperId]);

  if (!wrapperElement) return null;

  return createPortal(children, wrapperElement);
};
