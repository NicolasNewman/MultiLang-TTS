import { ADD_TAB, REMOVE_TAB, SET_FOLDER } from '../actions/folder';
import DataStore from '../classes/DataStore';

const dataStore = new DataStore();
const defaultPath = dataStore.get('defaultPath');
const start = defaultPath.lastIndexOf('\\') + 1;
const end = defaultPath.length - 1;
const name = defaultPath.substr(start, end);
const initialState = {
    panes: [
        {
            title: name,
            key: name,
            content: '',
            path: defaultPath
        }
    ],
    targetFolder: defaultPath
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
