import keyboard
import pyscreenshot
import os
import sys
import time
import subprocess

import asyncio
import websockets
import threading
import base64
import io
import ws

def cli():
    input()
    ws.LOOP.call_soon_threadsafe(ws.LOOP.stop)

def run_electron():
    electron_path = os.path.join('..', 'gui', 'node_modules', 'electron', 'dist', 'electron.exe')
    app_path = os.path.join('..', 'gui')
    subprocess.call([electron_path, app_path])
    ws.LOOP.call_soon_threadsafe(ws.LOOP.stop)

def take_screenshot():
    ss = pyscreenshot.grab()
    buffered = io.BytesIO()
    ss.save(buffered, format="PNG")
    base64_image = str(base64.b64encode(buffered.getvalue()))
    data = {'data': base64_image}
    ws.send('NEW_SCREENSHOT', data)

def main():
    start_server = websockets.serve(ws.websocket_handler, 'localhost', 3922)
    ws.LOOP.run_until_complete(start_server)
    threading.Thread(target=run_electron, daemon=True).start()
    keyboard.add_hotkey('snapshot', take_screenshot, args=())
    threading.Thread(target=cli, daemon=True).start()
    ws.LOOP.run_forever()
    # input()

if __name__ == '__main__':
    main()