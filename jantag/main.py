import keyboard
import pyscreenshot
import os
import subprocess

import asyncio
import websockets
import threading
import base64
import io
import ws

LOOP = asyncio.get_event_loop()

def run_electron(main_loop: asyncio.BaseEventLoop):
    electron_path = os.path.join('..', 'gui', 'node_modules', 'electron', 'dist', 'electron.exe')
    app_path = os.path.join('..', 'gui')
    subprocess.call([electron_path, app_path])
    main_loop.call_soon_threadsafe(main_loop.stop)


def take_screenshot():
    ss = pyscreenshot.grab()
    buffered = io.BytesIO()
    ss.save(buffered, format="PNG")
    base64_image = str(base64.b64encode(buffered.getvalue()))
    data = {'data': base64_image}
    asyncio.ensure_future(ws.send('NEW_SCREENSHOT', data), loop=LOOP)
    # pyscreenshot.grab_to_file('a.png')
    

def main():
    start_server = websockets.serve(ws.websocket_handler, 'localhost', 3922)
    loop=asyncio.get_event_loop()
    loop.run_until_complete(start_server)
    threading.Thread(target=run_electron, args=(loop,), daemon=True).start()
    keyboard.add_hotkey('snapshot', take_screenshot, args=())
    loop.run_forever()

if __name__ == '__main__':
    main()