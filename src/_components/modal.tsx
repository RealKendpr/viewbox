import { useEffect, useRef } from "react";

export default function Modal({
  title,
  message,
  isOpen,
  setIsOpen,
}: {
  title: string;
  message: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleModal = () => setIsOpen((isOpen) => !isOpen);

  useEffect(() => {
    const modal = modalRef.current;

    if (isOpen && modal) {
      modal.showModal();
    } else if (modal?.open) {
      modal.close();
      setIsOpen(false);
    }
  }, [isOpen]);

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
  }, [isOpen]);

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="py-4">{message}</p>
      </div>
      <div className="modal-backdrop" onClick={() => handleModal()} />
    </dialog>
  );
}
