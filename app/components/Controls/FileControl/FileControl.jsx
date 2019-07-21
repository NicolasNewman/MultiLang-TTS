import * as React from 'react';
import { Button, Slider } from 'antd';

const FileControl = props => {
    console.log(props.targetFile);
    return (
        <div className="controls">
            <div className="controls__buttons">
                <Button type="primary">
                    <i class="fas fa-download" />
                </Button>
            </div>
        </div>
    );
};

export default FileControl;
