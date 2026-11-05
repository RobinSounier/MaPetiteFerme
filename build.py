#!/usr/bin/env python3
"""Assemble les fichiers de src/ en un seul index.html jouable.

Utilisation : python3 build.py
"""
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"
ORDER = ["sprites.js", "sprites2.js", "world.js", "engine.js", "render.js", "ui.js"]

shell = (SRC / "shell.html").read_text(encoding="utf-8")
code = "\n".join((SRC / name).read_text(encoding="utf-8") for name in ORDER)
(ROOT / "index.html").write_text(shell.replace("/*__CODE__*/", code), encoding="utf-8")
print("index.html généré")
