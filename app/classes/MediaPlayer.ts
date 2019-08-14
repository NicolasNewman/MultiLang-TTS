import { Howl } from 'howler';
import store from '../index';
import { setPlayIcon, setTime } from '../actions/track';

export interface IMediaPlayer {
    setTrack(src: string): void;
    play(): void;
    pause(): void;
    stop(): void;
    seek(timeStamp: number): void;
    step(amount: number): void;
    dispatchPlayIcon(icon: string): void;
    getDuration(): number;
    getTimeStamp(): number;
    getIsPlaying(): boolean;
    isTrackDefined(): boolean;
}

/**
 * Manages everything related to playing media files within the app
 */
export default class MediaPlayer implements IMediaPlayer {
    private track;
    private isPlaying: boolean;
    private timeStampInterval;
    private duration: number;
    private timeStamp: number;

    constructor() {
        this.track = undefined;
        this.isPlaying = false;
        this.timeStampInterval = undefined;
        this.duration = 0; // total length of the track
        this.timeStamp = 0; // current playback position of the track
    }

    /**
     * Overwrites track with a new source file and initializes the event handlers
     * @param {string} src - the path to the audio file
     */
    setTrack = src => {
        if (!src.includes('.mp3')) {
            return;
        } // cancel task if no file is selected

        this.track = new Howl({
            src
        });

        store.dispatch(setTime(0));
        this.timeStampInterval = setInterval(() => {
            if (this.isPlaying && this.track) {
                store.dispatch(setTime(Math.ceil(this.track.seek())));
            }
        }, 500); // updates the position of the track every 500ms

        this.track.on('play', () => {
            this.isPlaying = true;
            this.duration = Math.ceil(this.track.duration());
            this.dispatchPlayIcon('fa-pause');
        });

        this.track.on('pause', () => {
            this.isPlaying = false;
            this.dispatchPlayIcon('fa-play');
        });

        this.track.on('end', () => {
            this.track = undefined;
            clearInterval(this.timeStampInterval);
            this.timeStampInterval = undefined;
            this.isPlaying = false;
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

    /**
     * Changes the playback position of the current track
     * @param {string} timestamp - the new position within the track
     */
    seek = () => {
        if (this.track) {
            this.track.seek(timeStamp);
            store.dispatch(setTime(Math.ceil(this.track.seek())));
        }
    };

    step = (): void => {
        if (this.track) {
            this.track.seek(this.track.seek() + amount);
            store.dispatch(setTime(Math.ceil(this.track.seek())));
        }
    };

    dispatchPlayIcon = () => {
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

    isTrackDefined = (): boolean => {
        return this.track === undefined ? false : true;
    };
}
