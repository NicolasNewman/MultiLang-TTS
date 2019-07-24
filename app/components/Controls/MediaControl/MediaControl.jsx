import React, { Component } from 'react';
import { Button, Slider, Typography } from 'antd';
import { Howl } from 'howler';

const { Text } = Typography;

export default class MediaControl extends Component {
    // sound = undefined;
    // duration = undefined;
    // isPlaying = false;
    // state = {
    //     playIcon: 'fa-play'
    // };

    shouldComponentUpdate(nextProps, nextState) {
        console.log(this.props.playIcon);
        console.log(nextProps.playIcon);
    }

    componentDidUpdate() {
        if (this.trackHasInit) {
            // this.props.track.on('play', () => {
            //     this.props.setStatus(true);
            //     // this.setState({ playIcon: 'fa-pause' }); // can't set state here twice in a row
            // });
            // this.props.track.on('pause', () => {
            //     this.props.setStatus(false);
            //     // this.setState({ playIcon: 'fa-play' });
            // });
            // this.props.track.on('end', () => {
            //     this.props.setTrack(undefined);
            //     this.props.setStatus(false);
            //     this.trackHasInit = false;
            //     // this.setState({ playIcon: 'fa-pause' });
            // });
            // this.props.track.play();
        }
        console.log('UPDATE');
    }
    play = () => {
        const src = `${this.props.targetFolder}\\${this.props.targetFile}`;
        if (!this.props.isPlaying && !this.props.sound) {
            // this.props.setTrack(src);
            this.props.setEventListeners(src);
            // this.props.setStatus(true);
        } else if (this.props.isPlaying) {
            this.props.track.pause();
        } else {
            this.props.track.play();
        }
    };

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

// export default MediaControl;
