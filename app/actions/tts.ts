export enum TTSTypeKeys {
    SET_LANG = 'SET_LANG',
    SET_VOICE = 'SET_VOICE',
    LOAD_DICT = 'LOAD_DICT'
}

interface SetLangAction {
    type: TTSTypeKeys.SET_LANG;
}

interface SetVoiceAction {
    type: TTSTypeKeys.SET_VOICE;
}

interface LoadDictAction {
    type: TTSTypeKeys.LOAD_DICT;
}

export type TTSTypes = SetLangAction | SetVoiceAction | LoadDictAction;

export function setLang(lang: string) {
    return {
        type: TTSTypeKeys.SET_LANG,
        lang
    };
}

export function setVoice(voice: string) {
    return {
        type: TTSTypeKeys.SET_VOICE,
        voice
    };
}

export function loadDict(ttsDict: string) {
    return {
        type: TTSTypeKeys.LOAD_DICT,
        ttsDict
    };
}

export default { setLang, setVoice, loadDict };
