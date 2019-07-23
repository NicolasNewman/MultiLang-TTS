export const SET_TRACK = 'SET_TRACK';
export const SET_TIME = 'SET_POSITION';
export const SET_STATUS = 'SET_STATUS';

export function setTrack(src) {
    return {
        type: SET_TRACK,
        src
    };
}

export function setTime(timeStamp) {
    return {
        type: SET_TIME,
        timeStamp
    };
}

export function setStatus(isPlaying) {
    return {
        type: SET_STATUS,
        isPlaying
    };
}

export default { setTrack, setTime, setStatus };
