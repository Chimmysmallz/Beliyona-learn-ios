"""
Study Egg - SERVE (test on your iPhone over Wi-Fi, no upload needed)

    python tools/serve.py

Your computer and phone must be on the same Wi-Fi. Open the address it prints
in Safari on the iPhone. Press Ctrl+C to stop.
"""
import http.server, socket, socketserver, os, functools
PORT = 8000
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
try:
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM); s.connect(('8.8.8.8', 80)); ip = s.getsockname()[0]; s.close()
except OSError:
    ip = 'YOUR-COMPUTER-IP'
Handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=root)
with socketserver.TCPServer(('', PORT), Handler) as httpd:
    print('Study Egg is running.')
    print(f'  On this computer:  http://localhost:{PORT}/')
    print(f'  On your iPhone:    http://{ip}:{PORT}/   (same Wi-Fi)')
    print('Press Ctrl+C to stop.')
    try: httpd.serve_forever()
    except KeyboardInterrupt: pass
