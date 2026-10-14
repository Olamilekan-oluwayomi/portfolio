"""Prepare the supplied CV for the public-only employment boundary.

Requires PyMuPDF. Source remains local: docs/deployment-identity.md and PRD.md
Appendix H. Keep the original PDF; this script creates the public derivative.
"""

from pathlib import Path
import re
import sys

sys.path.insert(0, str(Path("artifacts/pdf-inspection").resolve()))
import pymupdf  # noqa: E402


SOURCE = Path("docs/Olamilekan_Ilesanmi_CV_Web_Developer.pdf")
OUTPUT = Path("public/olamilekan-ilesanmi-cv.pdf")
original = pymupdf.open(SOURCE)
assert len(original) == 1, "Review the parser and layout if the source changes page count"
source = original[0].get_text()
headings = ["PROFILE", "TECHNICAL SKILLS", "PROFESSIONAL EXPERIENCE", "SELECTED PROJECTS", "EDUCATION"]
sections = {}
for index, heading in enumerate(headings):
    body = source.split(heading + "\n", 1)[1]
    if index + 1 < len(headings):
        body = body.split(headings[index + 1] + "\n", 1)[0]
    sections[heading] = body.strip()


def clean(value):
    return re.sub(r"\s+", " ", re.sub("[\u2013\u2014\u2011]", "-", value)).strip()


header = source.split("PROFILE\n", 1)[0].strip().splitlines()
profile = re.sub(r"Currently contributing.*?while independently", "Independently", sections["PROFILE"], flags=re.S)
assert profile != sections["PROFILE"], "Recheck the source's employment description before publication"
professional = sections["PROFESSIONAL EXPERIENCE"].splitlines()
role = professional[0].split("|")[0].strip()
dates = professional[1]
identity = Path("src/content/identity.ts").read_text(encoding="utf-8")
employer = re.search(r'employer: "([^"]+)"', identity).group(1)
field = sections["PROFESSIONAL EXPERIENCE"].split("Field Supervisor", 1)[1].strip().splitlines()
field_heading = "Field Supervisor " + field[0]
field_dates = field[1]
field_summary = clean("\n".join(field[2:]).replace("\u25cf", ""))

project_chunks = sections["SELECTED PROJECTS"].split("\u25cf")
projects = []
project_heading = project_chunks[0].strip()
for index, chunk in enumerate(project_chunks[1:]):
    lines = chunk.strip().splitlines()
    if index < len(project_chunks) - 2:
        description, next_heading = " ".join(lines[:-1]), lines[-1]
    else:
        description, next_heading = " ".join(lines), None
    projects.append((clean(project_heading), clean(description)))
    project_heading = next_heading

document = pymupdf.open()
page = document.new_page(width=612, height=792)
ink = (0.12, 0.16, 0.23)
muted = (0.32, 0.32, 0.32)
left, right = 45, 567
y = 53


def lines(value, width, font, size):
    result, current = [], ""
    for word in clean(value).split():
        candidate = (current + " " + word).strip()
        if current and pymupdf.get_text_length(candidate, fontname=font, fontsize=size) > width:
            result.append(current)
            current = word
        else:
            current = candidate
    if current:
        result.append(current)
    return result


def text(value, x=left, font="tiro", size=10, color=(0, 0, 0), leading=11.7, centered=False):
    global y
    for line in lines(value, right - x, font, size):
        position = (612 - pymupdf.get_text_length(line, fontname=font, fontsize=size)) / 2 if centered else x
        page.insert_text((position, y), line, fontname=font, fontsize=size, color=color)
        y += leading


def section(heading):
    global y
    y += 9
    text(heading, font="tibo", size=10.5, color=ink, leading=0)
    page.draw_line((left, y + 6), (right, y + 6), color=ink, width=0.8)
    y += 20


def bullet(value):
    global y
    page.insert_text((62, y), "\u2022", fontname="tiro", fontsize=10)
    text(value, x=80)
    y += 2


text(header[0], font="tibo", size=20, color=ink, leading=19, centered=True)
text(header[1], size=12, color=muted, leading=18, centered=True)
text(" ".join(header[2:]), size=9, color=muted, leading=10.5, centered=True)
section("PROFILE")
text(profile)
section("TECHNICAL SKILLS")
for item in sections["TECHNICAL SKILLS"].split("\u25cf"):
    if item.strip():
        bullet(item)
section("PROFESSIONAL EXPERIENCE")
text(f"{role} | {employer}", font="tibo")
text(dates, font="tiit", size=9.5, color=muted)
y += 7
text(field_heading, font="tibo")
text(field_dates, font="tiit", size=9.5, color=muted)
bullet(field_summary)
section("SELECTED PROJECTS")
for heading, description in projects:
    text(heading, font="tibo")
    bullet(description)
section("EDUCATION")
education = sections["EDUCATION"].splitlines()
text(education[0], font="tibo")
text(" ".join(education[1:]), color=muted)
assert y <= 747, f"CV exceeds safe page bounds: {y}"
document.set_metadata({"title": clean(header[0]) + " - CV", "author": clean(header[0])})
document.save(OUTPUT, garbage=4, deflate=True)
document.close()
public = pymupdf.open(OUTPUT)
public_text = public[0].get_text()
assert employer in public_text
assert "CRM" not in public_text and "Business Profile" not in public_text
assert "\u2014" not in public_text and "\u2013" not in public_text
public[0].get_pixmap(matrix=pymupdf.Matrix(1.5, 1.5)).save("artifacts/cv-public-review.png")
print(f"Prepared {OUTPUT}: {len(public)} page, {OUTPUT.stat().st_size} bytes")
