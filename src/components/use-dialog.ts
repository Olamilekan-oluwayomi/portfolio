"use client";
import { useEffect, useRef } from "react";

// Native dialog lifecycle: state decides open or closed, the browser keeps
// focus trap, Esc handling and focus restore (PRD.md sections 14 and 26).
export function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handle = () => onCloseRef.current();
    const handleOutside = (event: MouseEvent) => {
      const rect = dialog.getBoundingClientRect();
      const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
      if (outside) dialog.close();
    };
    dialog.addEventListener("close", handle);
    dialog.addEventListener("click", handleOutside);
    return () => {
      dialog.removeEventListener("close", handle);
      dialog.removeEventListener("click", handleOutside);
      if (dialog.open) dialog.close();
    };
  }, []);
  return ref;
}
