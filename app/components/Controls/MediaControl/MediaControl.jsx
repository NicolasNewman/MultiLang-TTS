import React, { Component } from 'react';
import { Button, Slider, Typography } from 'antd';
import { Howl } from 'howler';

const { Text } = Typography;

export default class MediaControl extends Component {
    play = () => {
        const src = `${this.props.targetFolder}\\${this.props.targetFile}`;
        const isPlaying = this.props.mediaPlayer.getIsPlaying();
        const isTrackDefined = this.props.mediaPlayer.isTrackDefined();

        // If the icon is set to stop, cancel the current track (set to stop in FileList.jsx)
        if (this.props.playIcon === 'fa-stop') {
            this.props.mediaPlayer.stop();
            return;
        }

        if (!isPlaying && !isTrackDefined) {
            this.props.mediaPlayer.setTrack(src);
            this.props.mediaPlayer.play();
        } else if (isPlaying) {
            this.props.mediaPlayer.pause();
        } else {
            this.props.mediaPlayer.play();
        }
    };
    changeTime = time => {
        this.props.mediaPlayer.seek(time);
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
                        min={0}
                        max={this.props.mediaPlayer.getDuration()}
                        defaultValue={this.props.timeStamp}
                        // onChange={}
                        onChange={this.changeTime}
                    />
                    <Text>{this.props.mediaPlayer.getDuration()}</Text>
                </div>
                <div className="controls__buttons">
                    <Button type="primary">
                        <i className="fas fa-step-backward" />
                    </Button>
                    <Button
                        onClick={this.play}
                        type={this.props.playButtonType}
                    >
                        <i className={`fas ${this.props.playIcon}`} />
                    </Button>
                    <Button type="primary">
                        <i className="fas fa-step-forward" />
                    </Button>
                </div>
            </div>
        );
    }
}
