"""
Study Egg - BUILD
Packs the editable src/ folder into ONE self-contained file (index.html at the
top of the repository), which GitHub Pages publishes.

    python tools/build.py            (same as: python tools/build.py src index.html)
"""
import base64, re, sys, os

def main(src_dir='src', out_file='index.html'):
    rd = lambda p: open(os.path.join(src_dir, p), encoding='utf-8', newline='').read()
    b64 = lambda p: base64.b64encode(open(os.path.join(src_dir, p), 'rb').read()).decode()
    s = rd('index.html')
    s = re.sub(r'<link rel="stylesheet" href="([^"]+)" data-inline>', lambda m: '<style>' + rd(m.group(1)) + '</style>', s)
    s = re.sub(r'<script src="([^"]+)" data-inline></script>', lambda m: '<script>' + rd(m.group(1)) + '</script>', s)
    if os.path.exists(os.path.join(src_dir, 'assets', 'apple-touch-icon.png')):
        s = s.replace('<link rel="apple-touch-icon" href="assets/apple-touch-icon.png"',
                      '<link rel="apple-touch-icon" href="data:image/png;base64,' + b64('assets/apple-touch-icon.png') + '"', 1)
    if os.path.exists(os.path.join(src_dir, 'manifest.json')):
        man = rd('manifest.json')
        if os.path.exists(os.path.join(src_dir, 'assets', 'icon.png')):
            man = man.replace('assets/icon.png', 'data:image/png;base64,' + b64('assets/icon.png'))
        s = s.replace('<link rel="manifest" href="manifest.json"',
                      '<link rel="manifest" href="data:application/manifest+json;base64,' + base64.b64encode(man.encode('utf-8')).decode() + '"', 1)
    if 'data-inline' in s:
        sys.exit('Some files could not be packed in (look for data-inline in src/index.html).')
    open(out_file, 'w', encoding='utf-8', newline='').write(s)
    print(f"Built {out_file}  ({len(s.encode('utf-8'))/1024/1024:.2f} MB)")

if __name__ == '__main__':
    a = sys.argv[1:]
    if len(a) not in (0, 2): print(__doc__); sys.exit(1)
    main(*a)
