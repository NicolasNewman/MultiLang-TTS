import * as React from 'react';
import MediaPlayer from '../../classes/MediaPlayer';
import { readdir } from 'fs';
import { List } from 'antd';
import { promisify } from 'util';
import * as chokidar from 'chokidar';

interface IProps {
    targetFile: string;
    mediaPlayer: MediaPlayer;
    path: string;
    setFile: (file: string) => void;
}

interface IState {
    data: Array<any>;
}

/**
 * Represents a list of files within a directory
 */
export default class FileList extends React.Component<IProps, IState> {
    private watcher;
    props: IProps;
    state: IState;

    constructor(props) {
        super(props);
        this.watcher = chokidar.watch(this.props.path, {
            ignored: /(^|[\/\\])\../,
            persistent: true,
            depth: 0
        }); // watches for file changes within a directory
        this.watcher.on('all', path => {
            this.getFiles().then(data => {
                data = data.filter(dat => {
                    return dat.endsWith('.mp3');
                }); // get rid of any file that isn't an mp3
                this.setState({ data: data });
            }); // reading from a directory is asyncronous, wait until it is processed
        });
        this.state = {
            data: []
        };
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
        if (this.props.mediaPlayer.getIsPlaying()) {
            this.props.mediaPlayer.dispatchPlayIcon('fa-stop');
        } // turn the play button to a stop button if another file is clicked
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
