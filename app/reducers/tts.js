import { SET_LANG, SET_VOICE, LOAD_VOICES } from '../actions/tts';

const initialState = {
    lang: '',
    voice: '',
    voiceDict: {}
};

export default function tts(state = initialState, action) {
    switch (action.type) {
        case SET_LANG:
            return {
                lang: action.lang,
                voice: state.voice,
                voiceDict: state.voiceDict
            };
        case SET_VOICE:
            return {
                lang: state.lang,
                voice: action.voice,
                voiceDict: state.voiceDict
            };
        case LOAD_VOICES:
            return {
                lang: state.lang,
                voice: state.voice,
                voiceDict: action.voiceDict
            };
        default:
            return state;
    }
}
