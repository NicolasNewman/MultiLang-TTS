export const SET_TRACK = 'SET_TRACK';
export const SET_TIME = 'SET_POSITION';
export const SET_STATUS = 'SET_STATUS';
// export const SET_PLAY_ICON = 'SET_PLAY_ICON';

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

export function setEventListeners(src) {
    return (dispatch, getState) => {
        dispatch(setTrack(src));
        getState().track.track.on('play', () => {
            console.log('play');
            dispatch(setStatus(true));
        });
        getState().track.track.on('pause', () => {
            dispatch(setStatus(false));
        });
        getState().track.track.on('end', () => {
            dispatch(setTrack(undefined));
            dispatch(setStatus(false));
        });
        dispatch(setStatus(true));
        getState().track.track.play();
    };
}
export default { setTrack, setTime, setStatus, setEventListeners };
