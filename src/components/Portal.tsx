import { createPortal } from "react-dom";

export interface IPortalProps {
  wrapperId: string;
  children: JSX.Element;
}

export const Portal: React.FC<IPortalProps> = ({ children, wrapperId }) => {
  const elem = document.getElementById(wrapperId);

  if (elem) {
    return createPortal(children, elem);
  } else {
    // probally should handle this better somehow?
    return <h1>ERROR</h1>;
  }
};
