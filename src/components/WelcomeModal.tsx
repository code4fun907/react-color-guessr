import Modal from "react-modal";
import { Logo } from "./Logo";

export interface IWelcomeModalProps {
  isOpen: boolean;
  onRequestClose: any;
}

export const WelcomeModal: React.FC<IWelcomeModalProps> = (props) => (
  <Modal {...props} className="p-10">
    <div className="bg-gray-100 p-4">
      <Logo />
      <hr />
      <p className="mb-2 mt-2">
        This is color guessr, a game where you will be shown random hex codes
        accompinied by a random color and your goal is to match the hex code to
        the shown color and get the higest score possible
      </p>
      <p className="mb-2 mt-2">
        if you have been here before your score will be persisted!
      </p>
      <hr />
      <button
        onClick={props.onRequestClose}
        className="bg-green-400 p-2 rounded-md mt-2"
      >
        START
      </button>
    </div>
  </Modal>
);
