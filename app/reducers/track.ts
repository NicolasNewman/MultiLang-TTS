import { TrackTypeKeys, TrackTypes } from '../actions/track';

interface InitialStateInterface = {
    playIcon: string,
    playButtonType: string,
    timeStamp: number
}

const initialState: InitialStateInterface = {
    playIcon: 'fa-play',
    playButtonType: 'primary',
    timeStamp: 0
};

export default function track(state: InitialStateInterface = initialState, action: TrackTypes) {
    switch (action.type) {
        case TrackTypeKeys.SET_PLAY_ICON:
            return {
                playIcon: action.icon,
                playButtonType: action.icon.includes('stop')
                    ? 'danger'
                    : 'primary',
                timeStamp: state.timeStamp
            };
        case TrackTypeKeys.SET_TIME:
            return {
                playIcon: state.playIcon,
                playButtonType: state.playButtonType,
                timeStamp: action.timeStamp
            };
        default:
            return state;
    }
}
