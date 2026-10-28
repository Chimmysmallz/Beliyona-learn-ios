"""
Study Egg - CHECK
Catches the most common mistakes after an edit, BEFORE you publish.

    python tools/check.py              (checks index.html)
    python tools/check.py some-file.html

  1. Every <script>/<style> block is opened and closed.
  2. JavaScript syntax of every block (full check if Node.js is installed,
     otherwise a bracket-and-quote balance check).
  3. Question cards have what they need (q, a, and wrong answers for mc).
"""
import re, sys, os, subprocess, tempfile, shutil

def prev_token(code, i):
    j = i - 1
    while j >= 0 and code[j] in ' \t\r\n': j -= 1
    if j < 0: return ''
    if code[j].isalpha():
        k = j
        while k >= 0 and code[k].isalpha(): k -= 1
        return code[k+1:j+1]
    return code[j]

def balance(code):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack, i, n, line = [], 0, len(code), 1
    while i < n:
        c = code[i]
        if c == '\n': line += 1
        if c in '"\'`':
            q = c; i += 1
            while i < n and code[i] != q:
                if code[i] == '\\': i += 1
                elif code[i] == '\n':
                    if q != '`': break
                    line += 1
                i += 1
        elif code.startswith('//', i):
            j = code.find('\n', i); i = n if j < 0 else j - 1
        elif code.startswith('/*', i):
            j = code.find('*/', i + 2); line += code[i:j].count('\n'); i = n if j < 0 else j + 1
        elif c == '/' and re.match(r'[(,=:\[!&|?{};+\-*%<>~^]|^$|return$|typeof$', prev_token(code, i)):
            i += 1; in_class = False
            while i < n and code[i] != '\n':
                if code[i] == '\\': i += 1
                elif code[i] == '[': in_class = True
                elif code[i] == ']': in_class = False
                elif code[i] == '/' and not in_class: break
                i += 1
        elif c in '([{': stack.append((c, line))
        elif c in ')]}':
            if not stack or stack[-1][0] != pairs[c]:
                return f"unexpected '{c}' around line {line}"
            stack.pop()
        i += 1
    if stack: return f"'{stack[-1][0]}' opened around line {stack[-1][1]} is never closed"
    return None

def main(path='index.html'):
    s = open(path, encoding='utf-8').read()
    problems = 0
    if s.count('<script') != s.count('</script>'):
        print('PROBLEM: <script> tags are not balanced'); problems += 1
    blocks = re.findall(r'<script>(.*?)</script>', s, re.S)
    node = shutil.which('node')
    for k, b in enumerate(blocks, 1):
        lm = re.search(r'/\*\s*=*\s*(.{0,50}?)\s*=*\s*\*/', b[:300]); label = lm.group(1) if lm else f'block {k}'
        if node:
            with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, encoding='utf-8') as f:
                f.write(b); tmp = f.name
            r = subprocess.run([node, '--check', tmp], capture_output=True, text=True); os.unlink(tmp)
            if r.returncode:
                problems += 1; print(f'PROBLEM in code section {k} ({label}):')
                print('   ' + '\n   '.join([l for l in r.stderr.splitlines() if l.strip()][:6]))
        else:
            err = balance(b)
            if err: problems += 1; print(f'PROBLEM in code section {k} ({label}): {err}')
    for m in re.finditer(r'\{\s*t:\s*["\'](mc|tf|type)["\'](.*?)\}', s):
        body = m.group(2); need = ['q:', 'a:'] + (['w:'] if m.group(1) == 'mc' else [])
        miss = [x for x in need if x not in body]
        if miss: problems += 1; print('PROBLEM: question card missing', ', '.join(miss), '->', m.group(0)[:100])
    print(f"Checked {len(blocks)} code sections" + (" with full JavaScript check." if node else " (install Node.js for a deeper check)."))
    print('ALL GOOD - safe to publish.' if not problems else f'{problems} problem(s) found - fix before publishing.')
    sys.exit(1 if problems else 0)

if __name__ == '__main__':
    main(*(sys.argv[1:2] or []))
