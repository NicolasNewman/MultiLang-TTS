import React, { Component } from 'react';
// import { Layout, Menu } from 'antd';
import FolderNav from '../FolderNav/FolderNav';
import AudioInput from '../AudioInput/AudioInput';
// import Input from '../Input/Input';
import Controls from '../Controls/Controls';
import { TabModel } from '../../reducers/folder';
import TTSClient from '../../classes/TTSClient';
import { key } from '../../constants/key.json';

// const { Footer, Sider, Content, Header } = Layout;

export default class Home extends Component {
    constructor(props) {
        super(props);
        console.log('HOME CONSTRUCTOR!!!');
        this.client = new TTSClient(key);
        this.client
            .buildVoicesDict()
            .then(res => {
                this.props.loadDict(res);
            })
            .catch(err => {});
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
                        text={this.props.text}
                        makeRequest={this.client.makeRequest}
                        lang={this.props.lang}
                        setLang={this.props.setLang}
                        langDict={this.props.langDict}
                        voice={this.props.voice}
                        setVoice={this.props.setVoice}
                        voiceDict={this.props.voiceDict}
                        ttsDict={this.props.ttsDict}
                        // getVoices={this.client.getVoices}
                    />
                </div>
            </div>
        );
    }
}
