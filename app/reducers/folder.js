import { ADD_TAB, REMOVE_TAB, SET_FOLDER } from '../actions/folder';
// export interface TabModel {
//     title: string;
//     key: string;
//     content: string;
// }
// export interface FolderState {
//     panes: Array<TabModel>;
// }

const initialState = {
    panes: [],
    targetFolder: ''
    // panes: [{ title: 'Test', key: '0', content: 'Hello', path: '' }]
};

export default function folder(state = initialState, action) {
    switch (action.type) {
        case ADD_TAB:
            return {
                panes: [
                    ...state.panes,
                    {
                        title: action.title,
                        key: action.key,
                        content: '3',
                        path: action.path
                    }
                ],
                targetFolder: state.targetFolder
            };
        case REMOVE_TAB:
            return {
                panes: state.panes.filter(pane => pane.key !== action.key),
                targetFolder: state.targetFolder
            };
        case SET_FOLDER:
            return {
                panes: state.panes,
                targetFolder: action.targetFolder
            };
        default:
            return state;
    }
}
