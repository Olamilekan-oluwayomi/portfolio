"use client";
import { useShell } from "./shell";
import { useDialog } from "./use-dialog";

export default function ShortcutSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { shortcutsOn, toggleShortcuts, decisionOn, toggleDecisions } = useShell();
  const sheetDialog = useDialog(open, onClose);
  return (
    <dialog className="shortcut-sheet" ref={sheetDialog} aria-label="Keyboard shortcuts">
      <div className="sheet-head"><h2>Keyboard shortcuts</h2><button type="button" className="dialog-close" onClick={() => sheetDialog.current?.close()}>Close</button></div>
      <table>
        <tbody>
          <tr><th scope="row"><kbd>⌘K</kbd> <span className="muted">or</span> <kbd>Ctrl K</kbd></th><td>Open the command palette</td></tr>
          <tr><th scope="row"><kbd>/</kbd></th><td>Open the palette when focus is not in a field</td></tr>
          <tr><th scope="row"><kbd>i</kbd></th><td>Toggle Inspect when focus is not in a field</td></tr>
          <tr><th scope="row"><kbd>d</kbd></th><td>Toggle Decision Mode when focus is not in a field</td></tr>
          <tr><th scope="row"><kbd>g</kbd> <span className="muted">then</span> <kbd>h</kbd></th><td>Home</td></tr>
          <tr><th scope="row"><kbd>g</kbd> <span className="muted">then</span> <kbd>w</kbd></th><td>Work</td></tr>
          <tr><th scope="row"><kbd>g</kbd> <span className="muted">then</span> <kbd>a</kbd></th><td>About</td></tr>
          <tr><th scope="row"><kbd>g</kbd> <span className="muted">then</span> <kbd>e</kbd></th><td>Experience</td></tr>
          <tr><th scope="row"><kbd>g</kbd> <span className="muted">then</span> <kbd>c</kbd></th><td>Contact</td></tr>
          <tr><th scope="row"><kbd>[</kbd> <span className="muted">and</span> <kbd>]</kbd></th><td>Previous and next project on project pages</td></tr>
          <tr><th scope="row"><kbd>?</kbd></th><td>Show this sheet</td></tr>
          <tr><th scope="row"><kbd>Esc</kbd></th><td>Close the top layer and restore focus</td></tr>
        </tbody>
      </table>
      <button type="button" className="shortcuts-toggle" aria-pressed={shortcutsOn} onClick={toggleShortcuts}>Single-character shortcuts: {shortcutsOn ? "on" : "off"}</button>
      <button type="button" className="shortcuts-toggle" aria-pressed={decisionOn} onClick={toggleDecisions}>Decision mode: {decisionOn ? "on" : "off"}</button>
      <p className="muted">Modifier shortcuts stay active when single-character shortcuts are off.</p>
    </dialog>
  );
}
