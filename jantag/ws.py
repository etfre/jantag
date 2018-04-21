import asyncio
import json

LOOP: asyncio.BaseEventLoop = asyncio.get_event_loop()
websocket = None

def send(msg_type: str, data=None):
    try:
        loop = asyncio.get_event_loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()
    message = {'type': msg_type, 'data': data}
    encoded_message = (json.dumps(message))
    loop.run_until_complete(_send(encoded_message))
    print('sent')

async def _send(message):
    print('some async thing start')
    await websocket.send(message)
    print('some async thing done')

async def websocket_handler(local_websocket, path):
    global websocket
    print('ws open')
    websocket = local_websocket
    while True:
        msg = await local_websocket.recv()
    print('ws close')
    # print("< {}".format(name))

    # greeting = "Hello {}!".format(name)
    # await local_websocket.send(greeting)
    # print("> {}".format(greeting))