import * as React from 'react';
import { Button } from 'antd';

const MediaControl = () => {
    return (
        <div className="controls">
            <div className="controls__playbar">
                <p>asd</p>
            </div>
            <div className="controls__buttons">
                <Button type="primary">
                    <i className="fas fa-play" />
                </Button>
            </div>
        </div>
    );
};

export default MediaControl;
