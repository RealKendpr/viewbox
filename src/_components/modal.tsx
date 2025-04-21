import { Suspense, useCallback, useEffect, useRef } from "react";
import { LoadingSpinner } from "./loadingComponents";

export default function Modal({
  children,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleModal = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, [setIsOpen]);

  useEffect(() => {
    const modal = modalRef.current;

    if (isOpen && modal) {
      modal.showModal();
    } else if (modal?.open) {
      modal.close();
      setIsOpen(false);
    }
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleModal();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleModal]);

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
      </div>
      <div className="modal-backdrop" onClick={() => handleModal()} />
    </dialog>
  );
}
