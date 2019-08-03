import * as React from 'react';
import MediaPlayer from '../../../classes/MediaPlayer';
import { Button, Slider, Typography } from 'antd';

const { Text } = Typography;

interface IProps {
    targetFolder: string;
    targetFile: string;
    //
    playIcon: string;
    playButtonType: any;
    setPlayIcon: (icon: string) => void;
    timeStamp: number;
    mediaPlayer: MediaPlayer;
}

export default class MediaControl extends React.Component<IProps> {
    props: IProps;

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

    changeTime = (time: number) => {
        this.props.mediaPlayer.seek(time);
    };

    step = (amount: number) => {
        this.props.mediaPlayer.step(amount);
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
                    <Button onClick={() => this.step(-5)} type="primary">
                        <i className="fas fa-step-backward" />
                    </Button>
                    <Button
                        onClick={this.play}
                        type={this.props.playButtonType}
                    >
                        <i className={`fas ${this.props.playIcon}`} />
                    </Button>
                    <Button onClick={() => this.step(5)} type="primary">
                        <i className="fas fa-step-forward" />
                    </Button>
                </div>
            </div>
        );
    }
}
