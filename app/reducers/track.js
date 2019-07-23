import { SET_TRACK, SET_TIME, SET_STATUS } from '../actions/track';
import { Howl } from 'howler';

const initialState = {
    track: undefined,
    timeStamp: 0,
    duration: 0,
    isPlaying: false
};

export default function track(state = initialState, action) {
    switch (action.type) {
        case SET_TRACK:
            const track = new Howl({
                src: action.src
            })
            const duration = track.duration();
            return {
                track
                timeStamp: 0,
                duration,
                isPlaying: false
            };
        case SET_TIME:
            return {
                track: state.track,
                timeStamp: action.timeStamp,
                duration: state.duration,
                isPlaying: state.isPlaying
            };
        case SET_STATUS:
            return {
                track: state.track,
                timeStamp: state.timeStamp,
                duration: state.duration,
                isPlaying: action.isPlaying
            };
        default:
            return state;
    }
}
