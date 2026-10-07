"use client";
import { useEffect, useState } from "react";
import { useShell } from "./shell";

export function HeaderActions() {
  const { openPalette, openMenu, decisionOn, toggleDecisions, inspectOn, toggleInspect } = useShell();
  const [isMac, setIsMac] = useState(false);
  useEffect(() => { setIsMac(/mac/i.test(navigator.userAgent)); }, []);
  return <>
    <button type="button" className="decisions-trigger" aria-pressed={inspectOn} onClick={toggleInspect}>Inspect <span aria-hidden="true">{inspectOn ? "on" : "I"}</span></button>
    <button type="button" className="decisions-trigger" aria-pressed={decisionOn} onClick={toggleDecisions}>Decisions <span aria-hidden="true">{decisionOn ? "on" : "D"}</span></button>
    <button type="button" className="palette-trigger" onClick={openPalette} aria-haspopup="dialog">Search <span aria-hidden="true">{isMac ? "⌘K" : "Ctrl K"}</span></button>
    <button type="button" className="menu-trigger" onClick={openMenu} aria-haspopup="dialog">Menu</button>
  </>;
}
