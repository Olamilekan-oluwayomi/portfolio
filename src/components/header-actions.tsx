"use client";
import { useEffect, useState } from "react";
import { useShell } from "./shell";

export function HeaderActions() {
  const { openPalette, openMenu } = useShell();
  const [isMac, setIsMac] = useState(false);
  useEffect(() => { setIsMac(/mac/i.test(navigator.userAgent)); }, []);
  return <>
    <button type="button" className="palette-trigger" onClick={openPalette} aria-haspopup="dialog">Search <span aria-hidden="true">{isMac ? "⌘K" : "Ctrl K"}</span></button>
    <button type="button" className="menu-trigger" onClick={openMenu} aria-haspopup="dialog">Menu</button>
  </>;
}
