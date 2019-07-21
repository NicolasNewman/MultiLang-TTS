import * as React from 'react';
import { Tabs } from 'antd';
import FileList from '../FileList/FileList';

const { dialog } = require('electron').remote;
const { TabPane } = Tabs;

class FolderNav extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        this.state = {
            activeKey: this.props.panes[0].key,
            panes: this.props.panes
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.panes.length !== this.props.panes.length) {
            this.setState({ panes: this.props.panes });
        }
    }
    // console.log(props);
    // console.log(props.panes);

    // createNewTab = () => {
    //     console.log('here');
    // };
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };
    add = () => {
        const path = dialog.showOpenDialog({
            title: 'Select a Folder with Audio Files',
            properties: ['openDirectory']
        })[0];
        const name = path.substr(path.lastIndexOf('\\') + 1, path.length - 1);
        const activeKey = `newTab${this.newTabIndex++}`;
        this.props.addTab(name, activeKey, path);
    };

    remove = targetKey => {
        this.props.removeTab(targetKey);
        // let activeKey = this.state.activeKey;
        // let lastIndex;
        // this.state.panes.forEach((pane, i) => {
        //     if (pane.key === targetKey) {
        //         lastIndex = i - 1;
        //     }
        // });
        // const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        // this.setState({ panes, activeKey });
    };

    render() {
        console.log(this.props);
        return (
            // <p>Hello</p>
            <Tabs
                // onChange={this.onChange}
                // activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
            >
                {this.state.panes.map(pane => {
                    return (
                        <TabPane
                            tab={pane.title}
                            key={pane.key}
                            // closable={pane.closable}
                        >
                            <FileList />
                            {/* {pane.content} */}
                        </TabPane>
                    );
                })}
            </Tabs>
        );
    }
}

export default FolderNav;
