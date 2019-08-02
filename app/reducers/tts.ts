import { TTSTypeKeys, TTSTypes } from '../actions/tts';

interface InitialStateInterface {
    lang: string;
    langDict: any;
    voice: string;
    voiceDict: any;
    ttsDict: any;
}

const initialState: InitialStateInterface = {
    lang: '',
    langDict: [],
    voice: '',
    voiceDict: [],
    ttsDict: {}
};

export default function tts(
    state: InitialStateInterface = initialState,
    action: TTSTypes
) {
    switch (action.type) {
        case TTSTypeKeys.SET_LANG:
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
        case TTSTypeKeys.SET_VOICE:
            return {
                lang: state.lang,
                langDict: state.langDict,
                voice: action.voice,
                voiceDict: state.voiceDict,
                ttsDict: state.ttsDict
            };
        case TTSTypeKeys.LOAD_DICT:
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
