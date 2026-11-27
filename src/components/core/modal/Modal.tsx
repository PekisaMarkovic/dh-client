"use client";

import { PropsWithChildren } from "react";
import ReactModal from "react-modal";
import CloseButton from "@/components/core/buttons/CloseButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  // for screen readers
  title: string;
  // set: the × in the top right corner, with this label for screen readers
  closeLabel?: string;
};

// the id of the element that holds the whole page (set in the root layout), the rest of the page is hidden from screen readers while a modal is open
export const APP_ROOT_ID = "app-root";

const styles: ReactModal.Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "calc(100% - 1.5rem)",
    maxWidth: "480px",
    maxHeight: "90dvh",
    borderRadius: "16px",
    border: "1px solid #44403c",
    padding: "24px",
    backgroundColor: "#1f1b18",
    color: "#f5f5f4",
  },
  overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 999 },
};

const Modal = ({ isOpen, onClose, title, closeLabel, children }: PropsWithChildren<Props>) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel={title}
    style={styles}
    appElement={typeof document !== "undefined" ? (document.getElementById(APP_ROOT_ID) ?? undefined) : undefined}
  >
    {closeLabel && (
      <div className="flex justify-end">
        <CloseButton label={closeLabel} onClick={onClose} />
      </div>
    )}
    {children}
  </ReactModal>
);

export default Modal;
