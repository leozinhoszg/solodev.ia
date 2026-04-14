import { useEffect, useRef, type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-950 p-0 text-zinc-100 backdrop:bg-black/60"
    >
      <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-zinc-100 transition-colors"
          aria-label="Fechar"
        >
          &#x2715;
        </button>
      </div>
      <div className="px-6 py-4">{children}</div>
    </dialog>
  );
}
