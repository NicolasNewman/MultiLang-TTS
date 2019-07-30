export const ADD_TAB = 'ADD_TAB';
export const REMOVE_TAB = 'REMOVE_TAB';
export const SET_FOLDER = 'SET_FOLDER';

/**
 *
 * @param {string} title - the title of the pane
 * @param {string} key - the key to identify the pane (usually the title)
 * @param {string} path - the path to the folder of the pane
 */
export function addTab(title, key, path) {
    return {
        type: ADD_TAB,
        title,
        key,
        path
    };
}

export function removeTab(key) {
    return {
        type: REMOVE_TAB,
        key
    };
}

export function setTargetFolder(folder) {
    return {
        type: SET_FOLDER,
        targetFolder: folder
    };
}

export default { addTab, removeTab, setTargetFolder };
