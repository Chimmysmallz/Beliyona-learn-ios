"""
Study Egg - SPLIT
Turns the single published app file (index.html) into an editable source folder.

    python tools/split.py index.html src
"""
import base64, re, sys, os

def slug(text, n):
    m = re.search(r'/\*\s*=+\s*(.+?)\s*=+\s*\*/', text[:400])
    name = m.group(1) if m else ('questions-bank' if 'window.EXTRA' in text[:600] else 'script')
    name = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')[:40] or 'script'
    return f"{n:02d}-{name}.js"

def main(src_file, out_dir):
    if os.path.exists(os.path.join(out_dir, 'index.html')):
        sys.exit(f"'{out_dir}' already has files. Move or rename it first so nothing is overwritten.")
    s = open(src_file, encoding='utf-8', newline='').read()
    for d in ('js', 'css', 'assets'):
        os.makedirs(os.path.join(out_dir, d), exist_ok=True)
    w = lambda p, t: open(os.path.join(out_dir, p), 'w', encoding='utf-8', newline='').write(t)

    # Home-screen icons and app manifest
    icon_uri = None
    m = re.search(r'<link rel="apple-touch-icon" href="(data:image/png;base64,([A-Za-z0-9+/=]+))"', s)
    if m:
        open(os.path.join(out_dir, 'assets', 'apple-touch-icon.png'), 'wb').write(base64.b64decode(m.group(2)))
        s = s.replace(m.group(0), '<link rel="apple-touch-icon" href="assets/apple-touch-icon.png"', 1)
    m = re.search(r'<link rel="manifest" href="data:application/manifest\+json;base64,([A-Za-z0-9+/=]+)"', s)
    if m:
        man = base64.b64decode(m.group(1)).decode('utf-8')
        im = re.search(r'"src": "(data:image/png;base64,([A-Za-z0-9+/=]+))"', man)
        if im:
            open(os.path.join(out_dir, 'assets', 'icon.png'), 'wb').write(base64.b64decode(im.group(2)))
            man = man.replace(im.group(1), 'assets/icon.png')
        w('manifest.json', man)
        s = s.replace(m.group(0), '<link rel="manifest" href="manifest.json"', 1)

    # Stylesheets
    out, pos, n = [], 0, 0
    for m in re.finditer(r'<style>(.*?)</style>', s, re.S):
        n += 1; name = 'styles.css' if n == 1 else f'styles{n}.css'
        w('css/' + name, m.group(1))
        out += [s[pos:m.start()], f'<link rel="stylesheet" href="css/{name}" data-inline>']; pos = m.end()
    s = ''.join(out) + s[pos:]

    # Scripts
    out, pos, n = [], 0, 0
    for m in re.finditer(r'<script>(.*?)</script>', s, re.S):
        n += 1; name = slug(m.group(1), n)
        w('js/' + name, m.group(1))
        out += [s[pos:m.start()], f'<script src="js/{name}" data-inline></script>']; pos = m.end()
    s = ''.join(out) + s[pos:]

    w('index.html', s)
    print(f"Split into {out_dir}/ : index.html, {n} code files, stylesheet, icons, manifest")

if __name__ == '__main__':
    if len(sys.argv) != 3: print(__doc__); sys.exit(1)
    main(sys.argv[1], sys.argv[2])
