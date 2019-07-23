import React, { Component } from 'react';
import { Button, Slider } from 'antd';
import { Howl } from 'howler';

export default class MediaControl extends Component {
    sound = undefined;
    state = {
        playIcon: 'fa-play'
    };
    play = () => {
        const src = `${this.props.targetFolder}\\${this.props.targetFile}`;
        this.sound = new Howl({
            src
        });
        this.sound.on('play', () => {
            console.log('play');
            this.setState({ playIcon: 'fa-pause' });
        });
        this.sound.on('end', () => {
            console.log('end');
            this.setState({ playIcon: 'fa-play' });
        });
        this.sound.play();
    };
    render() {
        return (
            <div className="controls">
                <div className="controls__playback">
                    <Slider />
                </div>
                <div className="controls__buttons">
                    <Button type="primary">
                        <i className="fas fa-step-backward" />
                    </Button>
                    <Button onClick={this.play} type="primary">
                        <i className={`fas ${this.state.playIcon}`} />
                    </Button>
                    <Button type="primary">
                        <i className="fas fa-step-forward" />
                    </Button>
                </div>
            </div>
        );
    }
}

// export default MediaControl;
