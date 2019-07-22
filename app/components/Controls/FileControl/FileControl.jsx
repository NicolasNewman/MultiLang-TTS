import * as React from 'react';
import { Button, Slider } from 'antd';
// import * as axios from 'axios';

const FileControl = props => {
    const download = () => {
        console.log(props.targetFolder);
        console.log(props.text);
        props.makeRequest.call(undefined, props.text);
    };
    return (
        <div className="controls">
            <div className="controls__buttons">
                <Button onClick={download} type="primary">
                    <i className="fas fa-download" />
                </Button>
            </div>
        </div>
    );
};

export default FileControl;
