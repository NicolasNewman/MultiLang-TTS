import * as React from 'react';
import { Tabs } from 'antd';
import FileList from '../FileList/FileList';

const { dialog } = require('electron').remote;
const { TabPane } = Tabs;

class FolderNav extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        // this.state = {
        //     activeKey: this.props.panes[0] ? this.props.panes[0].key : '0' // TODO: needed?
        //     // panes: this.props.panes
        // };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.panes.length !== this.props.panes.length) {
            // this.setState({ panes: this.props.panes });
        }
    }

    onEdit = (targetKey, action) => {
        console.log('onEdit');
        this[action](targetKey);
    };

    add = () => {
        const path = dialog.showOpenDialog({
            title: 'Select a Folder with Audio Files',
            properties: ['openDirectory']
        })[0];
        let name = path.substr(path.lastIndexOf('\\') + 1, path.length - 1);
        name = name.length > 5 ? name.substr(0, 5).concat('...') : name;

        const activeKey = `${name}`;
        this.props.addTab(name, activeKey, path);
        // this.props.set
    };

    remove = targetKey => {
        this.props.removeTab(targetKey);
    };

    onChange = activeKey => {
        let path = '';
        this.props.panes.forEach(pane => {
            if (activeKey === pane.title) {
                path = pane.path;
            }
        });
        this.props.setTargetFolder(path);
    };

    render() {
        console.log(this.props);
        return (
            <Tabs
                onChange={this.onChange}
                // activeKey={this.state.activeKey}
                type="editable-card"
                tabPosition="left"
                onEdit={this.onEdit}
            >
                {this.props.panes.map(pane => {
                    return (
                        <TabPane tab={pane.title} key={pane.key}>
                            <FileList
                                setFile={this.props.setFile}
                                targetFile={this.props.targetFile}
                                mediaPlayer={this.props.mediaPlayer}
                                path={pane.path}
                            />
                        </TabPane>
                    );
                })}
            </Tabs>
        );
    }
}

export default FolderNav;
