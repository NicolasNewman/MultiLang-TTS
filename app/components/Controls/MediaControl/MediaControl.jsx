import React, { Component } from 'react';
import { Button, Slider, Typography } from 'antd';
import { Howl } from 'howler';

const { Text } = Typography;

export default class MediaControl extends Component {
    // sound = undefined;
    // duration = undefined;
    // isPlaying = false;
    state = {
        playIcon: 'fa-play'
    };
    play = () => {
        // if (!this.props.isPlaying && (!this.props.sound || this.props.finished)) {

        // }

        
        // if (!this.isPlaying && !this.sound) {
        //     const src = `${this.props.targetFolder}\\${this.props.targetFile}`;
        //     this.sound = new Howl({
        //         src
        //     });
        //     this.sound.on('play', () => {
        //         this.isPlaying = true;
        //         this.duration = this.sound.duration();
        //         this.setState({ playIcon: 'fa-pause' });
        //     });
        //     this.sound.on('end', () => {
        //         this.isPlaying = false;
        //         this.setState({ playIcon: 'fa-play' });
        //         this.sound = undefined;
        //     });
        //     this.sound.play();
        // } else if (!this.isPlaying) {
        //     this.sound.play();
        //     this.isPlaying = true;
        //     this.setState({ playIcon: 'fa-pause' });
        // } else {
        //     this.sound.pause();
        //     this.isPlaying = false;
        //     this.setState({ playIcon: 'fa-play' });
        // }
    };
    render() {
        return (
            <div className="controls">
                <div className="controls__playback">
                    <Text>{this.props.timeStamp</Text>
                    <Slider
                        style={{
                            width: '30vw',
                            display: 'inline-block',
                            margin: '0 1rem'
                        }}
                    />
                    <Text>{this.props.duration}</Text>
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
