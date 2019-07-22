export const SET_LANG = 'SET_LANG';
export const SET_VOICE = 'SET_VOICE';
export const LOAD_VOICES = 'SET_VOICES';

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

export function loadVoiceDict(voiceDict) {
    return {
        type: LOAD_VOICES,
        voiceDict
    };
}

export default { setLang, setVoice, loadVoiceDict };
