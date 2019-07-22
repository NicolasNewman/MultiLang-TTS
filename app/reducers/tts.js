import { SET_LANG, SET_VOICE, LOAD_DICT } from '../actions/tts';

const initialState = {
    lang: '',
    langDict: [],
    voice: '',
    voiceDict: [],
    ttsDict: {}
};

export default function tts(state = initialState, action) {
    switch (action.type) {
        case SET_LANG:
            const voiceDict = [];
            state.ttsDict[action.lang].forEach(voice => {
                voiceDict.push(voice);
            });
            return {
                lang: action.lang,
                langDict: state.langDict,
                voice: state.voice,
                voiceDict,
                ttsDict: state.ttsDict
            };
        case SET_VOICE:
            return {
                lang: state.lang,
                langDict: state.langDict,
                voice: action.voice,
                voiceDict: state.voiceDict,
                ttsDict: state.ttsDict
            };
        case LOAD_DICT:
            const langDict = [];
            for (let lang in action.ttsDict) {
                langDict.push(lang);
            }
            return {
                lang: state.lang,
                langDict,
                voice: state.voice,
                voiceDict: state.voiceDict,
                ttsDict: action.ttsDict
            };
        default:
            return state;
    }
}
