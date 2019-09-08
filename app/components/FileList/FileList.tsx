import * as React from 'react';
import MediaPlayer from '../../classes/MediaPlayer';
import { readdir } from 'fs';
import { List } from 'antd';
import { promisify } from 'util';
import * as chokidar from 'chokidar';
import { unlink } from 'fs';

const { dialog } = require('electron').remote;

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
        console.log(filename);
    }

    async keyPressed(file, e) {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            console.log(e.key);
            const res = await dialog.showMessageBox({
                type: 'warning',
                title: 'Delete confirmation',
                message: `Are you sure you want to delete ${file}?`,
                buttons: ['Ok', 'Cancel'] // OK: 0, Cancel: 1
            });
            console.log(this.props.path + file);
            if (res === 0) {
                const mp3 = `${this.props.path}\\${file}`;
                const dat = `${this.props.path}\\${file.replace(
                    '.mp3',
                    '.dat'
                )}`;
                const files = [mp3, dat];
                files.forEach(path => {
                    unlink(path, err => {
                        if (err) {
                            console.log(`UNLINK ERROR: ${err}`);
                        }
                    });
                });
            }
        }
    }

    render() {
        console.log(this.props.targetFile);
        return (
            <div className="home__folder-nav--infinite">
                <List
                    dataSource={this.state.data}
                    renderItem={item => (
                        <div
                            // data-filename={item}
                            onClick={this.fileClicked.bind(this, item)}
                            tabIndex={1}
                            onKeyUp={this.keyPressed.bind(this, item)}
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
