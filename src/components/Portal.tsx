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
  let elem = document.getElementById(wrapperId);

  if (!elem) {
    elem = createWrapperAndAppendToBody(wrapperId);
  }

  return createPortal(children, elem);
};
