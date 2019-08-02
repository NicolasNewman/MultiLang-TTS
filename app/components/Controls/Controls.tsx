import * as React from 'react';
import { Switch, Route } from 'react-router';
import FileControl from './FileControl/FileControl';
import MediaControl from './MediaControl/MediaControl';

const routes = require('../../constants/routes.json');

interface IProps {
    targetFolder: string;
    targetFile: string;
    //
    text: string;
    makeRequest: (
        text: string,
        lang: string,
        voice: string,
        path: string,
        filename: string
    ) => void;
    lang: string;
    setLang: (lang: string) => void;
    setVoice: (voice: string) => void;
    langDict: string;
    voice: string;
    voiceDict: any;
    ttsDict: any;
    //
    playIcon: string;
    playButtonType: string;
    setPlayIcon: (icon: string) => void;
    timeStamp: number;
    mediaPlayer: any;
}

export default class Controls<IProps> {
    props: IProps;
    render() {
        return (
            <Switch>
                <Route
                    path={routes.HOME_MEDIA}
                    component={() => (
                        <MediaControl
                            targetFolder={this.props.targetFolder}
                            targetFile={this.props.targetFile}
                            //
                            playIcon={this.props.playIcon}
                            playButtonType={this.props.playButtonType}
                            setPlayIcon={this.props.setPlayIcon}
                            timeStamp={this.props.timeStamp}
                            mediaPlayer={this.props.mediaPlayer}
                        />
                    )}
                />
                <Route
                    path={routes.HOME_FILE}
                    component={() => (
                        <FileControl
                            targetFolder={this.props.targetFolder}
                            text={this.props.text}
                            makeRequest={this.props.makeRequest}
                            lang={this.props.lang}
                            setLang={this.props.setLang}
                            langDict={this.props.langDict}
                            voice={this.props.voice}
                            setVoice={this.props.setVoice}
                            voiceDict={this.props.voiceDict}
                        />
                    )}
                />
            </Switch>
        );
    }
}

// const Controls = props => {
//     return (
//         <Switch>
//             <Route
//                 path={routes.HOME_MEDIA}
//                 component={() => (
//                     <MediaControl
//                         targetFolder={props.targetFolder}
//                         targetFile={props.targetFile}
//                         //
//                         playIcon={props.playIcon}
//                         playButtonType={props.playButtonType}
//                         setPlayIcon={props.setPlayIcon}
//                         timeStamp={props.timeStamp}
//                         mediaPlayer={props.mediaPlayer}
//                     />
//                 )}
//             />
//             <Route
//                 path={routes.HOME_FILE}
//                 component={() => (
//                     <FileControl
//                         targetFolder={props.targetFolder}
//                         text={props.text}
//                         makeRequest={props.makeRequest}
//                         lang={props.lang}
//                         setLang={props.setLang}
//                         langDict={props.langDict}
//                         voice={props.voice}
//                         setVoice={props.setVoice}
//                         voiceDict={props.voiceDict}
//                         // getVoices={props.getVoices}
//                     />
//                 )}
//             />
//         </Switch>
//     );
// };

// export default Controls;
