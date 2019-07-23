import React, { Component } from 'react';
import { readdir } from 'fs';
import { List, message } from 'antd';
import { promisify } from 'util';
import { setFile } from '../../actions/file';
import * as chokidar from 'chokidar';

export default class FileList extends Component {
    state = {
        data: []
        // targetFile: ''
    };

    constructor(props) {
        super(props);
        this.watcher = chokidar.watch(this.props.path, {
            ignored: /(^|[\/\\])\../,
            persistent: true,
            depth: '0'
        });
        this.watcher.on('all', path => {
            this.getFiles().then(data => {
                data = data.filter(dat => {
                    return dat.endsWith('.mp3');
                });
                this.setState({ data: data });
            });
        });
    }
    readDirAsync = promisify(readdir);
    fileClass = 'home__folder-nav--file';

    async getFiles() {
        return await this.readDirAsync(this.props.path);
    }

    componentWillUnmount() {
        this.watcher.close();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.data.length !== nextState.data.length;
    }

    fileClicked(filename) {
        this.props.setFile(filename);
        this.forceUpdate();
    }

    render() {
        console.log(this.props.targetFile);
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
