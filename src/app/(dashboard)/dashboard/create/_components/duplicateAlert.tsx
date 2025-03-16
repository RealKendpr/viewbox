import { useEffect, useRef } from "react";

export default function DuplicateAlert({
  isDuplicate,
  setIsDuplicate,
  handleModal,
}: {
  isDuplicate: boolean;
  setIsDuplicate: React.Dispatch<React.SetStateAction<boolean>>;
  handleModal: () => void;
}) {
  const duplicateAlert = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modal = duplicateAlert.current;

    if (isDuplicate && modal) {
      modal.showModal();
    } else if (modal?.open) {
      modal.close();
      setIsDuplicate(false);
    }
  }, [isDuplicate]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleModal();
      }
    };
    if (isDuplicate) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDuplicate]);

  return (
    <dialog ref={duplicateAlert} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">⚠️ Page already exist</h3>
        <p className="py-4">
          The name of the page your trying to craete already exist, you may
          choose a different name.
        </p>
      </div>
      <div className="modal-backdrop" onClick={() => handleModal()} />
    </dialog>
  );
}
