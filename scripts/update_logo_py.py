"""Update embedded logo text to Ajaytraders while preserving the logo artwork."""
from __future__ import annotations

import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
LOGO_FILES = [
    ROOT / 'denichat-logo.webp',
    ROOT / 'assets' / 'denichat-logo-CnMczFfq.webp',
]
FAVICONS = [
    ROOT / 'favicon-48.png',
    ROOT / 'favicon-192.png',
    ROOT / 'favicon-512.png',
]


def is_orange(r: int, g: int, b: int) -> bool:
    return r > 180 and 50 < g < 170 and b < 120


def is_white(r: int, g: int, b: int) -> bool:
    return r > 210 and g > 210 and b > 210


def is_dark_text(r: int, g: int, b: int) -> bool:
    return r < 130 and g < 130 and b < 130


def sample_background(pixels, width: int, x: int, y: int):
    for offset in (22, 20, 18, 24, 16, 26):
        sy = y - offset
        if sy < 0:
            continue
        r, g, b = pixels[sy, x][:3]
        if g > 130 and r < 160 and not is_white(r, g, b):
            return (r, g, b)
    return (85, 219, 123)


def erase_text_band(img: Image.Image) -> None:
    pixels = img.load()
    width, height = img.size
    for _ in range(2):
        for y in range(516, 553):
            for x in range(378, 559):
                if y >= height or x >= width:
                    continue
                r, g, b = pixels[x, y][:3]
                if is_orange(r, g, b) or is_white(r, g, b) or not is_dark_text(r, g, b):
                    continue
                pixels[x, y] = (*sample_background(pixels, width, x, y), 255)


def draw_text(img: Image.Image) -> None:
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype('arialbd.ttf', 78)
    except OSError:
        font = ImageFont.load_default()
    draw.text((384, 500), 'Ajaytraders', fill='#000000', font=font)


def update_logo(path: Path) -> None:
    img = Image.open(path).convert('RGBA')
    erase_text_band(img)
    draw_text(img)
    img.save(path, 'WEBP', quality=92)
    print(f'Updated {path}')


def update_favicons(master: Path) -> None:
    master_img = Image.open(master).convert('RGBA')
    for favicon in FAVICONS:
        size = int(''.join(ch for ch in favicon.stem if ch.isdigit()))
        out = master_img.resize((size, size), Image.Resampling.LANCZOS)
        out.save(favicon, 'PNG')
        print(f'Updated {favicon}')


def main() -> None:
    for logo in LOGO_FILES:
        if logo.exists():
            update_logo(logo)
    master = LOGO_FILES[0]
    if master.exists():
        update_favicons(master)


if __name__ == '__main__':
    main()
