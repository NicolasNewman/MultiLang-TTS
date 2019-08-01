export enum TrackTypeKeys {
    SET_PLAY_ICON = 'SET_PLAY_ICON',
    SET_TIME = 'SET_TIME'
}

interface SetPlayIconAction {
    type: TrackTypeKeys.SET_PLAY_ICON;
    icon: string;
}

interface SetTimeAction {
    type: TrackTypeKeys.SET_TIME;
    timeStamp: string;
}

export type TrackTypes = SetPlayIconAction | SetTimeAction;

/**
 * Action function to set the desired icon identifyer for any play buttons
 * @param {string} icon
 * @return {object} action object
 */
export function setPlayIcon(icon: string) {
    return {
        type: TrackTypeKeys.SET_PLAY_ICON,
        icon
    };
}

/**
 * Action function to set the current position of the track
 * @param {string} timeStamp
 * @return {object} action object
 */
export function setTime(timeStamp: string) {
    return {
        type: TrackTypeKeys.SET_TIME,
        timeStamp
    };
}

export default { setPlayIcon, setTime };
