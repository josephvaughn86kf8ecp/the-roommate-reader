import os
import re
from flask import Flask, render_template, abort
import markdown

app = Flask(__name__)
CHAPTERS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "chapters")
BOOK_TITLE = "The Roommate"
BOOK_SUBTITLE = "a novel by Jarvis"


def load_chapters():
    files = sorted(f for f in os.listdir(CHAPTERS_DIR) if f.endswith(".md"))
    chapters = []
    for i, fname in enumerate(files, start=1):
        with open(os.path.join(CHAPTERS_DIR, fname), encoding="utf-8") as fh:
            text = fh.read()
        m = re.search(r"^# (.+)$", text, re.M)
        title = m.group(1).strip() if m else fname
        m2 = re.search(r"^## (.+)$", text, re.M)
        subtitle = m2.group(1).strip() if m2 else ""
        # Strip the title/subtitle lines from the rendered body (shown in header)
        body_text = re.sub(r"^# .+$", "", text, count=1, flags=re.M)
        body_text = re.sub(r"^## .+$", "", body_text, count=1, flags=re.M)
        html = markdown.markdown(body_text.strip())
        # Plain text for the read-aloud engine
        plain = re.sub(r"[*_#>`]", "", body_text).strip()
        plain = re.sub(r"\n{3,}", "\n\n", plain)
        chapters.append({
            "n": i,
            "slug": fname[:-3],
            "title": title,
            "subtitle": subtitle,
            "html": html,
            "plain": plain,
        })
    return chapters


@app.route("/")
def index():
    chapters = load_chapters()
    return render_template("index.html", book_title=BOOK_TITLE,
                           book_subtitle=BOOK_SUBTITLE, chapters=chapters)


@app.route("/chapter/<slug>")
def chapter(slug):
    chapters = load_chapters()
    slugs = [c["slug"] for c in chapters]
    if slug not in slugs:
        abort(404)
    i = slugs.index(slug)
    ch = chapters[i]
    prev_ch = chapters[i - 1] if i > 0 else None
    next_ch = chapters[i + 1] if i < len(chapters) - 1 else None
    return render_template("chapter.html", book_title=BOOK_TITLE, ch=ch,
                           prev_ch=prev_ch, next_ch=next_ch)


@app.route("/health")
def health():
    return "ok"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
