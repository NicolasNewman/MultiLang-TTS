import React, { Component } from 'react';
import { readdir } from 'fs';
import { List, message } from 'antd';
import { promisify } from 'util';

export default class FileList extends Component {
    state = {
        data: [],
        loading: false,
        hasMore: true
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

    handleInfiniteLoad() {
        let { data } = this.state;
        this.setState({ loading: true });
        if (data.length > 14) {
            message.warning('IL loaded all');
            this.setState({ hasMore: false, loading: false });
            return;
        }
    }

    render() {
        return (
            <div className="home__folder-nav--infinite">
                <List
                    dataSource={this.state.data}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
            </div>
        );
    }
}
