// import {observable} from 'mobx';
declare var window: any;

function generateUUID () {
    let d = new Date().getTime();
    d += performance.now();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export class WebSocketHandler {

    ws: WebSocket
    subscriptions: Map<string, any>
    sendQueue: any

    constructor(url: string) {
        this.ws = new WebSocket(url);
        this.ws.onmessage = (msg) => this.dispatchSubscriptions(msg.data);
        this.ws.onopen = () => {
            for (const msg of this.sendQueue) {
                this.ws.send(msg);
            }
            this.sendQueue = [];
        }
        this.subscriptions = new Map();
        this.sendQueue = []
    }

    send(topic: string, data: any = null) {
        const encodedMessage = JSON.stringify({topic, data});
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(encodedMessage)
        }
        else {
            this.sendQueue.push(encodedMessage);
        }
    }

    subscribe(topic: string, cb: any) {
        if (!this.subscriptions.has(topic)) this.subscriptions.set(topic, [])
        this.subscriptions.get(topic).push(cb)
    }

    dispatchSubscriptions(encodedMessage: string) {
        const msg = JSON.parse(encodedMessage);
        console.log('magnificientg')
        if (!this.subscriptions.has(msg.type)) return;
        const subscriptionCallbacks = this.subscriptions.get(msg.type);
        for (const cb of subscriptionCallbacks) {
            cb(msg.data)
        }
    }

 }