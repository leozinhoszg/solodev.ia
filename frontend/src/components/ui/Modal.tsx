import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

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
      className="glass-surface-strong glass-rim-top w-full max-w-lg rounded-2xl p-0 text-zinc-100 backdrop:bg-black/60 backdrop:backdrop-blur-sm open:animate-scale-in"
    >
      <div className="relative z-10 flex items-center justify-between border-b border-white/6 px-6 py-4">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <button
          onClick={onClose}
          className="cursor-pointer rounded-lg p-1 text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-200"
          aria-label="Fechar"
        >
          <X size={18} />
        </button>
      </div>
      <div className="relative z-10 px-6 py-4">{children}</div>
    </dialog>
  );
}
