export const SET_TRACK = 'SET_TRACK';
export const SET_TIME = 'SET_POSITION';
export const SET_STATUS = 'SET_STATUS';
export const SET_PLAY_ICON = 'SET_PLAY_ICON';
// export const SET_PLAY_ICON = 'SET_PLAY_ICON';

export function setPlayIcon(icon) {
    return {
        type: SET_PLAY_ICON,
        icon
    };
}

// export function setTrack(src) {
//     return {
//         type: SET_TRACK,
//         src
//     };
// }

export function setTime(timeStamp) {
    return {
        type: SET_TIME,
        timeStamp
    };
}

// export function setStatus(isPlaying) {
//     return {
//         type: SET_STATUS,
//         isPlaying
//     };
// }

// export default { setTrack, setTime, setStatus, setEventListeners };
export default { setPlayIcon, setTime };
