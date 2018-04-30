import React from 'react';
import ReactDOM from 'react-dom';
import {isNil} from 'lodash'

class ImageTagger extends React.Component<any, {}> {

    componentDidMount() {
    }

    get imageSource() {
    return isNil(this.props.screenShot) ? null : `data:image/png;base64,${this.props.screenShot.data}`
    }

    componentDidUpdate() {
        // var canvas: any = document.getElementById("c");
        // var ctx = canvas.getContext("2d");

        // var image = new Image();
        // image.onload = function () {
        //     ctx.drawImage(image, 0, 0);
        // };
        // const src = "data:image/png;base64," + (this.props.screenShot !== null ? this.props.screenShot.data : '')
        // console.log(src)
        // image.src = src
    }

    render() {
        const ssdata = this.imageSource;
        console.log('crazy', ssdata)
        return (
            <div id="canvas-wrapper">
                {ssdata && <img id="c" src={ssdata} />}
            </div>
        );
    }
}

export default ImageTagger;