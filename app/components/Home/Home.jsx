import React, { Component } from 'react';
import { withRouter } from 'react-router';
import FolderNav from '../FolderNav/FolderNav';
import AudioInput from '../AudioInput/AudioInput';
import Controls from '../Controls/Controls';
import { TabModel } from '../../reducers/folder';
import { key } from '../../constants/key.json';
import TTSClient from '../../classes/TTSClient';
import MediaPlayer from '../../classes/MediaPlayer';

// const { Footer, Sider, Content, Header } = Layout;

export default withRouter(
    class Home extends Component {
        constructor(props) {
            super(props);
            console.log('CONSTRUCTOR');
            this.client = new TTSClient(this.props.dataStore.get('key'));
            this.client
                .buildVoicesDict()
                .then(res => {
                    this.props.loadDict(res);
                })
                .catch(err => {});
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
