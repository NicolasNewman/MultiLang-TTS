import { Howl } from 'howler';

export default class MediaPlayer {
    constructor() {
        this.track = undefined;
        this.isPlaying = false;
        this.duration = 0;
        this.timeStamp = 0;
    }

    setTrack = src => {
        console.log('creating track');
        this.track = new Howl({
            src
        });
        this.track.on('play', () => {
            console.log('playing');
            this.isPlaying = true;
        });
        this.track.on('pause', () => {
            console.log('pause');
            this.isPlaying = false;
        });
        this.track.on('end', () => {
            console.log('end');
            this.track = undefined;
            this.isPlaying = false;
        });
    };

    play = () => {
        if (this.track) {
            console.log('playing sound');
            this.track.play();
        }
    };

    pause = () => {
        if (this.track) {
            this.track.pause();
        }
    };

    getDuration = () => {
        return this.duration;
    };
    getTimeStamp = () => {
        return this.timeStamp;
    };
    getIsPlaying = () => {
        return this.isPlaying;
    };
    isTrackDefined = () => {
        return this.track === undefined ? false : true;
    };
}
