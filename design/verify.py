#!/usr/bin/env python3
"""Phase 2 verification for the design tokens.

Two checks, both derived from PRD.md and design/tokens.css with no other input:

1. Every palette hex in tokens.css matches the PRD (PRD.md:636 to PRD.md:643 and
   PRD.md:646 to PRD.md:653).
2. Every documented contrast pair is recomputed with the WCAG 2.x relative luminance
   formula and checked against its threshold: 4.5:1 for text, 3:1 for non-text marks
   and for borders that identify a control (PRD.md:590, PRD.md:657).

Exits non-zero if anything fails. Run from the repository root:

    python design/verify.py
"""

import io
import re
import sys

PRD = "PRD.md"
CSS = "design/tokens.css"

PAPER_BLOCK = (636, 643)
NIGHT_BLOCK = (646, 653)

# (label, foreground token, background token, threshold or None)
PAIRS = [
    ("ink on paper", "--ink", "--paper", 4.5),
    ("graphite on paper", "--graphite", "--paper", 4.5),
    ("redline-text on paper", "--redline-text", "--paper", 4.5),
    ("redline on paper (marks)", "--redline", "--paper", 3.0),
    ("graphite on paper (control borders)", "--graphite", "--paper", 3.0),
    ("ink on paper-raised", "--ink", "--paper-raised", 4.5),
    ("rule on paper (dividers only)", "--rule", "--paper", None),
]


def luminance(hex_value):
    channels = [int(hex_value[i:i + 2], 16) / 255 for i in (1, 3, 5)]

    def linearise(c):
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

    r, g, b = (linearise(c) for c in channels)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a, b):
    la, lb = luminance(a), luminance(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def prd_palette(first, last):
    lines = io.open(PRD, encoding="utf-8").read().split("\n")
    out = {}
    for line in lines[first - 1:last]:
        m = re.match(r"\s*(--[a-z-]+):\s*(#[0-9A-Fa-f]{6})", line)
        if m:
            out[m.group(1)] = m.group(2).lower()
    return out


def css_block(text, selector):
    start = text.index(selector)
    end = text.index("}", start)
    out = {}
    for m in re.finditer(r"(--[a-z-]+):\s*(#[0-9A-Fa-f]{6})", text[start:end]):
        out[m.group(1)] = m.group(2).lower()
    return out


def main():
    raw = io.open(CSS, encoding="utf-8").read()
    css = re.sub(r"/\*.*?\*/", "", raw, flags=re.S)

    failures = []

    themes = [
        ("paper", prd_palette(*PAPER_BLOCK), css_block(css, ":root {")),
        ("night", prd_palette(*NIGHT_BLOCK), css_block(css, ':root[data-theme="night"]')),
    ]

    print("Palette hexes against the PRD")
    for name, expected, actual in themes:
        for token in sorted(expected):
            if actual.get(token) != expected[token]:
                failures.append("%s %s: PRD %s, css %s"
                                % (name, token, expected[token], actual.get(token)))
        for token in sorted(set(expected) - set(actual)):
            failures.append("%s %s missing from tokens.css" % (name, token))
        print("  %-6s %d tokens, %d mismatched"
              % (name, len(expected),
                 sum(1 for t in expected if actual.get(t) != expected[t])))

    print()
    print("Contrast, recomputed with WCAG 2.x relative luminance")
    for name, expected, actual in themes:
        print("  %s theme" % name)
        for label, fg, bg, threshold in PAIRS:
            if fg not in actual or bg not in actual:
                failures.append("%s: token missing for %s" % (name, label))
                continue
            ratio = contrast(actual[fg], actual[bg])
            if threshold is None:
                verdict = "no requirement, dividers only"
            elif ratio >= threshold:
                verdict = "pass at %.1f:1" % threshold
            else:
                verdict = "FAIL, needs %.1f:1" % threshold
                failures.append("%s %s: %.2f:1 below %.1f:1"
                                % (name, label, ratio, threshold))
            print("    %-36s %6.2f:1  %s" % (label, ratio, verdict))

    print()
    if failures:
        print("FAILED")
        for f in failures:
            print("  " + f)
        return 1
    print("OK: palette matches the PRD, every contrast pair passes")
    return 0


if __name__ == "__main__":
    sys.exit(main())
