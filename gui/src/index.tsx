import React from 'react';
import './app.css'
import ReactDOM from 'react-dom';
import { Button } from 'material-ui'
import ImageTagger from './image-tagger';
import { Treebeard } from 'react-treebeard';
import { WebSocketHandler } from './websocket'

class App extends React.Component<any, any> {

    ws: WebSocketHandler

    onNewScreenshot = (data: any) => {
        this.setState({screenShot: data})
    }

    constructor(params: any) {
        super(params);
        this.ws = new WebSocketHandler(`ws://localhost:3922`);
        this.state = {
            screenShot: null
        }
    }

    componentDidMount() {
        this.ws.subscribe('NEW_SCREENSHOT', this.onNewScreenshot);
    }


    render() {
        return (
            <div id="osspeak-application">
                <Button>foob</Button>
                <ImageTagger screenShot={this.state.screenShot} />
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