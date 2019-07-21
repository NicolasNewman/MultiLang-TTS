export const ADD_TAB = 'ADD_TAB';
export const REMOVE_TAB = 'REMOVE_TAB';

export function addTab(title) {
    return {
        type: ADD_TAB,
        title
    };
}

export function removeTab(key) {
    return {
        type: REMOVE_TAB,
        key
    };
}

export default { addTab, removeTab };
