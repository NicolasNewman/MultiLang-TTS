import {
    SET_TRACK,
    SET_TIME,
    SET_STATUS,
    SET_PLAY_ICON
} from '../actions/track';
import { Howl } from 'howler';

const initialState = {
    track: undefined,
    timeStamp: 0,
    duration: 0,
    isPlaying: false,
    playIcon: 'fa-play'
};

export default function track(state = initialState, action) {
    switch (action.type) {
        case SET_TRACK:
            let track;
            if (action.src) {
                track = new Howl({
                    src: action.src
                });
            } else {
                track = undefined;
            }
            const duration = track.duration();
            console.log('duration: ', duration);
            return {
                track,
                timeStamp: 0,
                duration,
                isPlaying: false,
                playIcon: state.playIcon
            };
        case SET_TIME:
            return {
                track: state.track,
                timeStamp: action.timeStamp,
                duration: state.duration,
                isPlaying: state.isPlaying,
                playIcon: state.playIcon
            };
        case SET_STATUS:
            let playIcon = action.isPlaying ? 'fa-pause' : 'fa-play';
            console.log('playIcon', playIcon);
            return {
                track: state.track,
                timeStamp: state.timeStamp,
                duration: state.duration,
                isPlaying: action.isPlaying,
                playIcon
            };
        default:
            return state;
    }
}
