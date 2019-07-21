import * as React from 'react';
import { Button, Slider } from 'antd';

const MediaControl = () => {
    return (
        <div className="controls">
            <div className="controls__playback">
                <Slider />
            </div>
            <div className="controls__buttons">
                <Button type="primary">
                    <i className="fas fa-step-backward" />
                </Button>
                <Button type="primary">
                    <i className="fas fa-play" />
                </Button>
                <Button type="primary">
                    <i className="fas fa-step-forward" />
                </Button>
            </div>
        </div>
    );
};

export default MediaControl;
