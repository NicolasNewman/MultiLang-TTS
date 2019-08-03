import * as React from 'react';
import MediaPlayer from '../../classes/MediaPlayer';
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
    ) => Promise<any>;
    lang: string;
    setLang: (lang: string) => void;
    setVoice: (voice: string) => void;
    langDict: string;
    voice: string;
    voiceDict: any;
    ttsDict: any;
    //
    playIcon: string;
    playButtonType: any;
    setPlayIcon: (icon: string) => void;
    timeStamp: number;
    mediaPlayer: MediaPlayer;
}

export default class Controls extends React.Component<IProps> {
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
