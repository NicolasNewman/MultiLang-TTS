export enum FolderTypeKeys {
    ADD_TAB = 'ADD_TAB',
    REMOVE_TAB = 'REMOVE_TAB'
}

interface AddTabAction {
    type: FolderTypeKeys.ADD_TAB;
    title: string;
}

interface RemoveTabAction {
    type: FolderTypeKeys.REMOVE_TAB;
    key: string;
}

export type FolderActionTypes = AddTabAction | RemoveTabAction;

export function addTab(title) {
    return {
        type: FolderTypeKeys.ADD_TAB,
        title
    };
}

export function removeTab(key) {
    return {
        type: FolderTypeKeys.REMOVE_TAB,
        key
    };
}

export default { addTab, removeTab };
