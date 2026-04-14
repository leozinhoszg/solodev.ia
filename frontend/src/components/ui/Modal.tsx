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
      className="w-full max-w-lg rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-0 text-zinc-100 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop:bg-black/60 backdrop:backdrop-blur-sm open:animate-scale-in"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-200 cursor-pointer"
          aria-label="Fechar"
        >
          <X size={18} />
        </button>
      </div>
      <div className="px-6 py-4">{children}</div>
    </dialog>
  );
}
