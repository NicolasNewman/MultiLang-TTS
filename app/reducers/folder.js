import { ADD_TAB, REMOVE_TAB } from '../actions/folder';
// export interface TabModel {
//     title: string;
//     key: string;
//     content: string;
// }
// export interface FolderState {
//     panes: Array<TabModel>;
// }

const initialState = {
    panes: [{ title: 'Test', key: '0', content: 'Hello' }]
};

export default function folder(state = initialState, action) {
    switch (action.type) {
        case ADD_TAB:
            return {
                panes: [
                    ...state.panes,
                    { title: action.title, key: '2', content: '3' }
                ]
            };
        case REMOVE_TAB:
            console.log('remove');
        default:
            return state;
    }
}
