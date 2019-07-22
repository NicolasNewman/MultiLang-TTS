import * as React from 'react';
import { Button, Slider } from 'antd';

const FileControl = props => {
    const download = () => {
        console.log(props.targetFolder);
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
