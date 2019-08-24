import { Howl } from 'howler';
import store from '../index';
import { setPlayIcon, setTime } from '../actions/track';
import { setInput } from '../actions/input';
import { exists, readFile } from 'fs';

/**
 * Manages everything related to playing media files within the app
 */
export default class MediaPlayer {
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
    setTrack = (src: string): void => {
        const datFile = src.replace('.mp3', '.dat');
        exists(datFile, exists => {
            if (exists) {
                readFile(datFile, 'utf-8', (err, data) => {
                    console.log('err ', err);
                    store.dispatch(setInput(data));
                });
            } else {
                console.log('dat file does not exist for this track');
            }
        });
        if (src.includes('.mp3')) {
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
        } // cancel task if no file is selected
    };

    /**
     * If the track is defined, play it
     */
    play = (): void => {
        if (this.track) {
            this.track.play();
        }
    };

    /**
     * If the track is defined, pause it. Playback can be resumed by calling play()
     */
    pause = (): void => {
        if (this.track) {
            this.track.pause();
        }
    };

    /**
     * If the track is defined, stop playback of the track and remove it from memory
     */
    stop = (): void => {
        if (this.track) {
            this.track.stop();
            this.track = undefined;
            this.isPlaying = false;
            this.dispatchPlayIcon('fa-play');
        }
    };

    /**
     * Changes the playback position of the current track
     * @param {number} timestamp - the new position within the track
     */
    seek = (timeStamp: number): void => {
        if (this.track) {
            this.track.seek(timeStamp);
            store.dispatch(setTime(Math.ceil(this.track.seek())));
        }
    };

    /**
     * Jumps the position of the track by a certain amount, relative to where you currently are
     * @param {number} amount - the amount of time to skip (positive or negative)
     */
    step = (amount: number): void => {
        if (this.track) {
            this.track.seek(this.track.seek() + amount);
            store.dispatch(setTime(Math.ceil(this.track.seek())));
        }
    };

    /**
     * Dispatches an event to change the play button within the Home component
     * @param {string} icon - the name of the FontAwesome icon
     */
    dispatchPlayIcon = (icon: string): void => {
        store.dispatch(setPlayIcon(icon));
    };

    /**
     * @returns {number} - the duration (in seconds) of the track
     */
    getDuration = (): number | undefined => {
        return this.isTrackDefined() ? this.duration : undefined;
    };

    /**
     * @returns {number} - the amount (in seconds) of the track that has been played
     */
    getTimeStamp = (): number | undefined => {
        return this.isTrackDefined() ? this.timeStamp : undefined;
    };

    /**
     * @returns {boolean} - wheather or not the track is playing
     */
    getIsPlaying = (): boolean | undefined => {
        return this.isTrackDefined() ? this.isPlaying : undefined;
    };

    /**
     * @returns {boolean} - wheather or not the track is defined
     */
    isTrackDefined = (): boolean => {
        return this.track === undefined ? false : true;
    };
}
