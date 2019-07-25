import { Howl } from 'howler';
import store from '../index';
// import { dispatch } from 'rxjs/internal/observable/pairs';
import { setPlayIcon, setTime } from '../actions/track';

export default class MediaPlayer {
    constructor() {
        this.track = undefined;
        this.isPlaying = false;
        this.timeStampInterval = undefined;
        this.duration = 0;
        this.timeStamp = 0;
    }

    setTrack = src => {
        this.track = new Howl({
            src
        });
        store.dispatch(setTime(0));
        this.timeStampInterval = setInterval(() => {
            if (this.isPlaying && this.track) {
                store.dispatch(setTime(Math.ceil(this.track.seek())));
            }
        }, 500);
        this.track.on('play', () => {
            this.isPlaying = true;
            this.duration = Math.ceil(this.track.duration());
            // store.dispatch(setPlayIcon('fa-pause'));
            this.dispatchPlayIcon('fa-pause');
        });
        this.track.on('pause', () => {
            this.isPlaying = false;
            // store.dispatch(setPlayIcon('fa-play'));
            this.dispatchPlayIcon('fa-play');
        });
        this.track.on('end', () => {
            this.track = undefined;
            clearInterval(this.timeStampInterval);
            this.timeStampInterval = undefined;
            this.isPlaying = false;
            // store.dispatch(setPlayIcon('fa-play'));
            this.dispatchPlayIcon('fa-play');
        });
    };

    play = () => {
        if (this.track) {
            this.track.play();
        }
    };

    pause = () => {
        if (this.track) {
            this.track.pause();
        }
    };

    stop = () => {
        if (this.track) {
            this.track.stop();
            this.track = undefined;
            this.isPlaying = false;
            this.dispatchPlayIcon('fa-play');
        }
    };

    seek = timeStamp => {
        if (this.track) {
            this.track.seek(timeStamp);
        }
    };

    dispatchPlayIcon = icon => {
        store.dispatch(setPlayIcon(icon));
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
