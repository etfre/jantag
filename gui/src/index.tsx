import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'material-ui'
import ImageTagger from './image-tagger';
import { Treebeard } from 'react-treebeard';
import { WebSocketHandler } from './websocket'

class App extends React.Component<any, {}> {

    ws: WebSocketHandler

    onNewScreenshot = (data: any) => {
        console.log('onss');
    }

    constructor(params: any) {
        super(params);
        this.ws = new WebSocketHandler(`ws://localhost:3922`);
    }

    componentDidMount() {
        this.ws.subscribe('NEW_SCREENSHOT', this.onNewScreenshot);
    }


    render() {
        return (
            <div id="osspeak-application">
                <Button>foo</Button>
                <ImageTagger />
                {/* <TreeExample /> */}
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app-root'),
)

// export default App;