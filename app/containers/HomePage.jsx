// import * as React from 'react';
// import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home/Home';

import FolderActions from '../actions/folder';
import FileActions from '../actions/file';
import InputActions from '../actions/input';
import TTSActions from '../actions/tts';

const mapStateToProps = state => {
    return {
        panes: state.folder.panes,
        targetFolder: state.folder.targetFolder,
        targetFile: state.file.file,
        text: state.input.text,
        lang: state.tts.lang,
        langDict: state.tts.langDict,
        voice: state.tts.voice,
        voiceDict: state.tts.voiceDict,
        ttsDict: state.tts.ttsDict
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { ...FolderActions, ...FileActions, ...InputActions, ...TTSActions },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

// import * as React from 'react';
// import { Component } from 'react';
// import { bindActionCreators, Dispatch } from 'redux';
// import { connect } from 'react-redux';
// import Home from '../components/Home/Home';

// import FolderActions from '../actions/folder';

// interface TabModel {
//     title: string;
//     key: string;
//     content: string;
// }
// interface FolderState {
//     panes: Array<TabModel>;
// }

// export interface OwnProps {}

// export interface StateProps {
//     panes: Array<TabModel>;
// }

// export interface DispatchProps {
//     addTab: (title: string) => void;
//     removeTab: (key: string) => void;
// }

// type Props = StateProps & DispatchProps & OwnProps;

// class HomePage extends Component<Props, any> {
//     props: Props;
//     render() {
//         console.log('HomePage: ', this.props.panes);
//         return <Home />;
//     }
// }

// const mapStateToProps = (
//     state: FolderState,
//     ownProps: OwnProps
// ): StateProps => {
//     return {
//         panes: state.panes
//     };
// };

// const mapDispatchToProps = (
//     dispatch: Dispatch<any>,
//     ownProps: OwnProps
// ): DispatchProps => {
//     return bindActionCreators(FolderActions, dispatch);
// };

// export default connect<StateProps, DispatchProps, OwnProps>(
//     mapStateToProps,
//     mapDispatchToProps
// )(HomePage);
