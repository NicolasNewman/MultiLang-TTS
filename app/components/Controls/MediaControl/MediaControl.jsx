import React, { Component } from 'react';
import { Button, Slider, Typography } from 'antd';
import { Howl } from 'howler';

const { Text } = Typography;

export default class MediaControl extends Component {
    state = {
        playIcon: 'fa-play' // if you switch and go back while paused, it resets to play
    };

    play = () => {
        const src = `${this.props.targetFolder}\\${this.props.targetFile}`;
        if (
            !this.props.mediaPlayer.getIsPlaying() &&
            !this.props.mediaPlayer.isTrackDefined()
        ) {
            this.props.mediaPlayer.setTrack(src);
            this.props.mediaPlayer.play();
            this.setState({ playIcon: 'fa-pause' });
        } else if (this.props.mediaPlayer.getIsPlaying()) {
            this.props.mediaPlayer.pause();
            this.setState({ playIcon: 'fa-play' });
        } else {
            this.props.mediaPlayer.play();
            this.setState({ playIcon: 'fa-pause' });
        }
        // if (!this.props.isPlaying && !this.props.sound) {
        //     // this.props.setTrack(src);
        //     this.props.setEventListeners(src);
        //     // this.props.setStatus(true);
        // } else if (this.props.isPlaying) {
        //     this.props.track.pause();
        // } else {
        //     this.props.track.play();
        // }
    };

    render() {
        return (
            <div className="controls">
                <div className="controls__playback">
                    <Text>{this.props.timeStamp}</Text>
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
