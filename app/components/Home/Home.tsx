import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import FolderNav from '../FolderNav/FolderNav';
import AudioInput from '../AudioInput/AudioInput';
import Controls from '../Controls/Controls';
// import { TabModel } from '../../reducers/folder';
import TTSClient from '../../classes/TTSClient';
import DataStore from '../../classes/DataStore';
import MediaPlayer from '../../classes/MediaPlayer';
// import { setTargetFolder } from 'app/actions/folder';

interface IProps extends RouteComponentProps<any> {
    dataStore: DataStore;
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
    playButtonType: any;
    // File Actions
    setFile: (file: string) => void;
    getFile: () => void;
    // Folder Actions
    addTab: (title: string, key: string, path: string) => void;
    removeTab: (key: string) => void;
    setTargetFolder: (folder: string) => void;
    // Input Actions
    setInput: (text: string) => void;
    // Track Actions
    setPlayIcon: (icon: string) => void;
    setTime: (timeStamp: string) => void;
    // TTS Actions
    setLang: (lang: string) => void;
    setVoice: (voice: string) => void;
    loadDict: (ttsDict: any) => void;
}

export default withRouter(
    class Home extends React.Component<IProps> {
        props: IProps;
        private client: TTSClient;
        private mediaPlayer: MediaPlayer;

        constructor(props, history) {
            super(props);
            console.log('CONSTRUCTOR');
            console.log(history);
            this.client = new TTSClient(this.props.dataStore.get('key'));
            this.client
                .buildVoicesDict()
                .then(res => {
                    this.props.loadDict(res);
                })
                .catch(err => {
                    console.log('THERE WAS AN ERROR');
                    console.log(typeof this.client);
                });
            this.mediaPlayer = new MediaPlayer();
        }
        toggleControl(path) {
            path = `/home/${path}`;
            if (this.props.history.location.pathname !== path) {
                this.props.history.push(path);
            }
        }
        render() {
            console.log(this);
            return (
                <div className="home">
                    <div
                        className="home__folder-nav "
                        onClick={this.toggleControl.bind(this, 'media')}
                    >
                        <FolderNav
                            addTab={this.props.addTab}
                            removeTab={this.props.removeTab}
                            panes={this.props.panes}
                            setFile={this.props.setFile}
                            targetFile={this.props.targetFile}
                            setTargetFolder={this.props.setTargetFolder}
                            mediaPlayer={this.mediaPlayer}
                        />
                    </div>
                    <div className="home__main-content">
                        <div
                            onClick={this.toggleControl.bind(this, 'file')}
                            className="click-wrapper"
                        >
                            <AudioInput setInput={this.props.setInput} />
                        </div>
                        <Controls
                            targetFolder={this.props.targetFolder}
                            targetFile={this.props.targetFile}
                            //
                            text={this.props.text}
                            makeRequest={this.client.makeRequest}
                            lang={this.props.lang}
                            setLang={this.props.setLang}
                            langDict={this.props.langDict}
                            voice={this.props.voice}
                            setVoice={this.props.setVoice}
                            voiceDict={this.props.voiceDict}
                            ttsDict={this.props.ttsDict}
                            //
                            playIcon={this.props.playIcon}
                            playButtonType={this.props.playButtonType}
                            setPlayIcon={this.props.setPlayIcon}
                            timeStamp={this.props.timeStamp}
                            mediaPlayer={this.mediaPlayer}
                        />
                    </div>
                </div>
            );
        }
    }
);
