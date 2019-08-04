import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home/Home';

import FolderActions from '../actions/folder';
import FileActions from '../actions/file';
import InputActions from '../actions/input';
import TrackActions from '../actions/track';
import TTSActions from '../actions/tts';

export interface HomeState {
    dataStore: any;
    //
    panes: any;
    targetFolder: string;
    targetFile: string;
    //
    text: string;
    lang: string;
    langDict: any;
    voice: string;
    voiceDict: any;
    ttsDict: any;
    //
    timeStamp: number;
    playIcon: string;
    playButtonType: string;
}

const mapStateToProps = (state, ownProps) => {
    return {
        dataStore: ownProps.dataStore,
        //
        panes: state.folder.panes,
        targetFolder: state.folder.targetFolder,
        targetFile: state.file.file,
        //
        text: state.input.text,
        lang: state.tts.lang,
        langDict: state.tts.langDict,
        voice: state.tts.voice,
        voiceDict: state.tts.voiceDict,
        ttsDict: state.tts.ttsDict,
        //
        timeStamp: state.track.timeStamp,
        playIcon: state.track.playIcon,
        playButtonType: state.track.playButtonType
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            ...FolderActions,
            ...FileActions,
            ...InputActions,
            ...TrackActions,
            ...TTSActions
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
