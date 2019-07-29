export const SET_PLAY_ICON = 'SET_PLAY_ICON';
export const SET_TIME = 'SET_POSITION';

/**
 * Action function to set the desired icon identifyer for any play buttons
 * @param {string} icon
 * @return {object} action object
 */
export function setPlayIcon(icon) {
    return {
        type: SET_PLAY_ICON,
        icon
    };
}

/**
 * Action function to set the current position of the track
 * @param {string} timeStamp
 * @return {object} action object
 */
export function setTime(timeStamp) {
    return {
        type: SET_TIME,
        timeStamp
    };
}

export default { setPlayIcon, setTime };
