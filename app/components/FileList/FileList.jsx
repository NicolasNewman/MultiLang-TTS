import React, { Component } from 'react';
import { readdir } from 'fs';
import { List } from 'antd';
import { promisify } from 'util';

export default class FileList extends Component {
    state = {
        data: []
    };
    readDirAsync = promisify(readdir);

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

    render() {
        return (
            <List
                dataSource={this.state.data}
                renderItem={item => <List.Item>{item}</List.Item>}
            />
        );
    }
}
