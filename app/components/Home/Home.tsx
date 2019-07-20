import * as React from 'react';
// import { Layout, Menu } from 'antd';
// import FolderNav from '../FolderNav/FolderNav';
// import Input from '../Input/Input';
// import Controls from '../Controls/Controls';

import { TabModel } from '../../reducers/folder';

// const { Footer, Sider, Content, Header } = Layout;

type Props = {
    addTab: (title: string) => void;
    removeTab: (key: string) => void;
    panes: Array<TabModel>;
};

export default class Home extends React.Component<Props, any> {
    props: Props;

    render() {
        // this.props.addTab('asfhajskf');
        // console.log(this.props.panes);
        return (
            <div className="home">
                <div className="home__folder-nav ">
                    <p>Hi</p>
                </div>
                <div className="home__main-content">
                    <p>Hi</p>
                </div>
                {/* <Layout>
                    <Header className="header toolbar">
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>
                    <Sider className="folder-nav">
                        <FolderNav panes={this.props.panes} />
                    </Sider>
                    <Layout className="main-panel">
                        <Content>
                            <Input />
                        </Content>
                        <Footer>
                            <Controls />
                        </Footer>
                    </Layout>
                </Layout> */}
            </div>
        );
    }
}
