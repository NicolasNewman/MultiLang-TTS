import * as React from 'react';
import { Tabs } from 'antd';
import FileList from '../FileList/FileList';

const { dialog } = require('electron').remote;
const { TabPane } = Tabs;

interface IProps {
    panes: any;
    targetFile: string;
    mediaPlayer: any;
    setFile: (file: string) => void;
    addTab: (title: string, key: string, path: string) => void;
    removeTab: (key: string) => void;
    setTargetFolder: (folder: string) => void;
}
/**
 * Represents the tab pane that displays open folders
 * A pane is stored as
 *  panes: [
        {
            title:
            key: 
            content:
            path: 
        }
    ]
 */
class FolderNav extends React.Component<IProps> {
    props: IProps;

    constructor(props) {
        super(props);
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
        let name = path.substr(path.lastIndexOf('\\') + 1, path.length - 1); // get path after final \\
        name = name.length > 5 ? name.substr(0, 5).concat('...') : name; // shorten string

        this.props.addTab(name, name, path);
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
        }); // decide which pane in the store to get the new path from
        this.props.setTargetFolder(path); // update the redux store with the new targeted path
    };

    render() {
        console.log(this.props);
        return (
            <Tabs
                onChange={this.onChange}
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
