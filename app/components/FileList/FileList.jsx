import React, { Component } from 'react';
import { readdir } from 'fs';
import { List, message } from 'antd';
import { promisify } from 'util';
import { setFile } from '../../actions/file';

export default class FileList extends Component {
    state = {
        data: []
        // targetFile: ''
    };
    readDirAsync = promisify(readdir);
    fileClass = 'home__folder-nav--file';

    async getFiles() {
        return await this.readDirAsync(this.props.path);
    }

    componentDidMount() {
        this.getFiles().then(data => {
            this.setState({
                data: data
            });
        });
    }
    fileClicked(filename) {
        this.props.setFile(filename);
    }
    render() {
        return (
            <div className="home__folder-nav--infinite">
                <List
                    dataSource={this.state.data}
                    renderItem={item => (
                        <div
                            onClick={this.fileClicked.bind(this, item)}
                            className={
                                item === this.props.targetFile
                                    ? `selected ${this.fileClass}`
                                    : this.fileClass
                            }
                        >
                            <List.Item>{item}</List.Item>
                        </div>
                    )}
                />
            </div>
        );
    }
}
