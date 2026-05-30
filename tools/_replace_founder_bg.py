#!/usr/bin/env python3
"""
Quita el fondo a una foto de fundadora y la compone sobre un fondo
rosa brand-aligned para que matchee con las otras fotos del set.

Uso:
  python3 tools/_replace_founder_bg.py <input> <output> [--bg HEX]

Default bg: #DDA9A0 (tono entre Karina #D29C9A y Elvira #EBC9C0)
"""
import sys
from pathlib import Path
from PIL import Image, ImageFilter
from rembg import remove

def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def main():
    args = sys.argv[1:]
    if len(args) < 2:
        print(__doc__)
        sys.exit(1)

    in_path = Path(args[0])
    out_path = Path(args[1])
    bg_hex = '#DDA9A0'
    if '--bg' in args:
        i = args.index('--bg')
        bg_hex = args[i+1]

    bg_rgb = hex_to_rgb(bg_hex)

    print(f'• input:  {in_path}')
    print(f'• output: {out_path}')
    print(f'• bg:     {bg_hex} -> {bg_rgb}')

    # 1. Quita el fondo (RGBA con alpha)
    with open(in_path, 'rb') as f:
        cut_bytes = remove(f.read())

    from io import BytesIO
    cut = Image.open(BytesIO(cut_bytes)).convert('RGBA')

    # 2. Suaviza ligeramente el alpha para evitar bordes pixelados
    alpha = cut.split()[3].filter(ImageFilter.GaussianBlur(radius=0.6))
    cut.putalpha(alpha)

    # 3. Crea el canvas rosa del mismo tamaño
    canvas = Image.new('RGB', cut.size, bg_rgb)

    # 4. Compone con la máscara alpha
    canvas.paste(cut, (0, 0), cut)

    # 5. Resize a max 1400px (para web)
    max_side = 1400
    w, h = canvas.size
    if max(w, h) > max_side:
        if w >= h:
            new_w, new_h = max_side, int(h * max_side / w)
        else:
            new_w, new_h = int(w * max_side / h), max_side
        canvas = canvas.resize((new_w, new_h), Image.LANCZOS)

    # 6. Guarda como JPG 85%
    out_path.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(out_path, 'JPEG', quality=85, optimize=True)
    print(f'✓ guardado: {out_path} ({canvas.size[0]}x{canvas.size[1]})')

if __name__ == '__main__':
    main()
