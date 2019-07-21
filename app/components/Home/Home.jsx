import React, { Component } from 'react';
// import { Layout, Menu } from 'antd';
import FolderNav from '../FolderNav/FolderNav';
import AudioInput from '../AudioInput/AudioInput';
// import Input from '../Input/Input';
import Controls from '../Controls/Controls';
import { TabModel } from '../../reducers/folder';

// const { Footer, Sider, Content, Header } = Layout;

export default class Home extends Component {
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
                    />
                </div>
                <div className="home__main-content">
                    <div
                        onClick={this.toggleControl.bind(this, 'file')}
                        className="click-wrapper"
                    >
                        <AudioInput />
                    </div>
                    <Controls />
                </div>
            </div>
        );
    }
}
