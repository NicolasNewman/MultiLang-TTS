import * as React from 'react';
// import { Layout, Menu } from 'antd';
import FolderNav from '../FolderNav/FolderNav';
// import Input from '../Input/Input';
// import Controls from '../Controls/Controls';

import { TabModel } from '../../reducers/folder';

// const { Footer, Sider, Content, Header } = Layout;

export default class Home extends React.Component {
    render() {
        return (
            <div className="home">
                <div className="home__folder-nav ">
                    <FolderNav panes={this.props.panes} />>
                </div>
                <div className="home__main-content">
                    <p>Hi</p>
                </div>
            </div>
        );
    }
}
