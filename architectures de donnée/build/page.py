# -*- coding: utf-8 -*-
"""Affiche le texte d'une ou plusieurs pages du PDF source.

Usage : python build/page.py 16 17
"""
import os
import sys

import fitz

SRC = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "Seance_1_Introduction_architectures_donnees_modernes_IBM.pdf",
)

with fitz.open(SRC) as d:
    for n in sys.argv[1:]:
        print("===== PAGE %s =====" % n)
        print(d[int(n) - 1].get_text())
