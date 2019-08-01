import { FolderTypeKeys, FolderTypes } from '../actions/folder';
import DataStore from '../classes/DataStore';

const dataStore = new DataStore();
const defaultPath = dataStore.get('defaultPath');
const start = defaultPath.lastIndexOf('\\') + 1;
const end = defaultPath.length - 1;
const name = defaultPath.substr(start, end);

interface InitialStateInterface {
    panes: [
        {
            title: string;
            key: string;
            path: string;
        }
    ];
    targetFolder: string;
}

const initialState: InitialStateInterface = {
    panes: [
        {
            title: name,
            key: name,
            path: defaultPath
        }
    ],
    targetFolder: defaultPath
};

export default function folder(
    state: InitialStateInterface = initialState,
    action: FolderTypes
) {
    switch (action.type) {
        case FolderTypeKeys.ADD_TAB:
            return {
                panes: [
                    ...state.panes,
                    {
                        title: action.title,
                        key: action.key,
                        path: action.path
                    }
                ],
                targetFolder: state.targetFolder
            };
        case FolderTypeKeys.REMOVE_TAB:
            return {
                panes: state.panes.filter(pane => pane.key !== action.key),
                targetFolder: state.targetFolder
            };
        case FolderTypeKeys.SET_FOLDER:
            return {
                panes: state.panes,
                targetFolder: action.targetFolder
            };
        default:
            return state;
    }
}
