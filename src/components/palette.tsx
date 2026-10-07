"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { siteIdentity } from "@/content/identity";
import { buildCommands, searchCommands, type Command, type PaletteDecision } from "@/lib/palette";
import { toggleTheme } from "./theme-toggle";
import { useDialog } from "./use-dialog";

// Command palette contract: PRD.md sections 14, 21 and 26.
type PaletteProps = {
  open: boolean;
  onClose: () => void;
  decisions: PaletteDecision[];
  shortcutsOn: boolean;
  decisionOn: boolean;
  inspectOn: boolean;
  motion: "full" | "reduced" | "lite";
  announce: (message: string) => void;
  onToggleShortcuts: () => void;
  onToggleDecisions: () => void;
  onOpenSheet: () => void;
  onToggleInspect: () => void;
  onToggleLite: () => void;
  onToggleReduce: () => void;
};

export default function Palette({ open, onClose, decisions, shortcutsOn, decisionOn, inspectOn, motion, announce, onToggleShortcuts, onToggleDecisions, onToggleInspect, onToggleLite, onToggleReduce, onOpenSheet }: PaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dialog = useDialog(open, onClose);
  const commands = useMemo(() => buildCommands(decisions, shortcutsOn, decisionOn, inspectOn, motion), [decisions, shortcutsOn, decisionOn, inspectOn, motion]);
  const results = useMemo(() => searchCommands(commands, query), [commands, query]);

  useEffect(() => { setActive(0); }, [query]);
  useEffect(() => {
    if (!open) return;
    setQuery("");
    inputRef.current?.focus();
  }, [open]);
  useEffect(() => {
    const option = listRef.current?.children[active] as HTMLElement | undefined;
    option?.scrollIntoView({ block: "nearest" });
  }, [active, results.length]);

  function run(command: Command) {
    const action = command.action;
    if (action.kind === "href") {
      onClose();
      router.push(action.href);
    } else if (action.kind === "external") {
      onClose();
      window.open(action.href, "_blank", "noopener,noreferrer");
    } else if (action.kind === "copy-email") {
      onClose();
      const copied = navigator.clipboard?.writeText(siteIdentity.email);
      if (copied) {
        copied.then(() => announce("Copied")).catch(() => announce("Press Ctrl C to copy."));
      } else {
        announce("Press Ctrl C to copy.");
      }
    } else if (action.kind === "theme") {
      toggleTheme();
      onClose();
    } else if (action.kind === "shortcuts") {
      onToggleShortcuts();
      onClose();
    } else if (action.kind === "decisions") {
      onToggleDecisions();
      onClose();
    } else if (action.kind === "inspect") {
      onClose(); onToggleInspect();
    } else if (action.kind === "lite") {
      onToggleLite(); onClose();
    } else if (action.kind === "reduce-motion") {
      onToggleReduce(); onClose();
    } else if (action.kind === "sheet") {
      onClose();
      onOpenSheet();
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive(index => (results.length > 0 ? (index + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive(index => (results.length > 0 ? (index - 1 + results.length) % results.length : 0));
    } else if (event.key === "Enter") {
      const command = results[active];
      if (command) {
        event.preventDefault();
        run(command);
      }
    }
  }

  return <dialog className="palette" ref={dialog} aria-label="Command palette" onClose={onClose}>
    <div className="palette-frame">
      <input
        ref={inputRef}
        className="palette-input"
        type="text"
        role="combobox"
        aria-expanded="true"
        aria-controls="palette-results"
        aria-autocomplete="list"
        aria-activedescendant={results.length > 0 ? `palette-option-${active}` : undefined}
        aria-label="Type a command"
        placeholder="Type a command"
        value={query}
        onChange={event => setQuery(event.target.value)}
        onKeyDown={onKeyDown}
        autoComplete="off"
        spellCheck={false}
      />
      <ul className="palette-results" id="palette-results" role="listbox" aria-label="Commands" ref={listRef}>
        {results.map((command, index) => <li
          key={command.id}
          id={`palette-option-${index}`}
          role="option"
          aria-selected={index === active}
          className={index === active ? "is-active" : undefined}
          onMouseMove={() => setActive(index)}
          onMouseDown={event => event.preventDefault()}
          onClick={() => run(command)}
        >
          <span className="palette-group">{command.group}</span>
          <span className="palette-label">{command.label}</span>
          {command.hint && <span className="palette-hint">{command.hint}</span>}
        </li>)}
      </ul>
      {results.length === 0 && <p className="palette-empty">No command matches that. Press Esc to close.</p>}
      <p className="palette-count" role="status">{`${results.length} result${results.length === 1 ? "" : "s"}`}</p>
    </div>
  </dialog>;
}
