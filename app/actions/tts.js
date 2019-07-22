export const SET_LANG = 'SET_LANG';
export const SET_VOICE = 'SET_VOICE';
export const LOAD_DICT = 'LOAD_DICT';

export function setLang(lang) {
    return {
        type: SET_LANG,
        lang
    };
}

export function setVoice(voice) {
    return {
        type: SET_VOICE,
        voice
    };
}

export function loadDict(ttsDict) {
    return {
        type: LOAD_DICT,
        ttsDict
    };
}

export default { setLang, setVoice, loadDict };
