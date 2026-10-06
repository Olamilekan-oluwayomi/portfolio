"use client";
import { useRef, useState } from "react";
import { siteIdentity } from "@/content/identity";

// Copy feedback contract: PRD.md sections 20 and 26.
export function CopyEmail() {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const addressRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | undefined>(undefined);

  function show(message: "copied" | "failed") {
    setState(message);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 1500);
  }

  function copy() {
    const address = siteIdentity.email;
    const copied = navigator.clipboard?.writeText(address);
    if (copied) {
      copied.then(() => show("copied")).catch(() => select());
    } else {
      select();
    }
    function select() {
      const element = addressRef.current;
      if (element) {
        const range = document.createRange();
        range.selectNodeContents(element);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      show("failed");
    }
  }

  return <>
    <button type="button" className="contact-address" ref={addressRef} onClick={copy}>
      {siteIdentity.email}
    </button>
    <p className="contact-live" role="status" aria-live="polite">{state === "copied" ? "Copied" : state === "failed" ? "Press Ctrl C to copy." : ""}</p>
  </>;
}
