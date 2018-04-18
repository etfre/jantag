import json

websocket = None

async def send(msg_type: str, data=None):
    message = {'type': msg_type, 'data': data}
    websocket.send(json.dumps(message))

async def websocket_handler(local_websocket, path):
    global websocket
    websocket = local_websocket
    name = await local_websocket.recv()
    print("< {}".format(name))

    greeting = "Hello {}!".format(name)
    await local_websocket.send(greeting)
    print("> {}".format(greeting))