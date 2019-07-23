import React, { Component } from 'react';
import { Button, Slider, Select, Input, Popover } from 'antd';

const { Option, OptGroup } = Select;
const { Search } = Input;
const { dialog } = require('electron').remote;

class FileControl extends Component {
    popoverContent = (
        <Search
            placeholder="Enter file name"
            enterButton="Submit"
            size="small"
            onSearch={filename => {
                this.props
                    .makeRequest(
                        this.props.text,
                        this.props.lang,
                        this.props.voice,
                        this.props.targetFolder,
                        filename
                    )
                    .then(res => {
                        // this.setState({ state: this.state });
                    });
            }}
        />
    );

    constructor(props) {
        super(props);
        this.langOpt = this.props.langDict.map(lang => {
            return (
                <Option key={lang} value={lang}>
                    {lang}
                </Option>
            );
        });
        this.voiceOpt = this.props.voiceDict.map(voice => {
            return (
                <Option key={voice} value={voice}>
                    {voice}
                </Option>
            );
        });
    }

    download = () => {
        // this.props.makeRequest(
        //     this.props.text,
        //     this.props.lang,
        //     this.props.voice
        // );
    };

    langChange = lang => {
        this.props.setLang(lang);
        this.props.setVoice('');
    };

    voiceChange = voice => {
        this.props.setVoice(voice);
    };

    render() {
        console.log(this.props.lang);
        return (
            <div className="controls">
                <div className="controls__buttons">
                    <Select
                        defaultValue={this.props.lang}
                        style={{ width: 90 }}
                        onChange={this.langChange}
                    >
                        {this.langOpt}
                    </Select>
                    <Select
                        defaultValue={this.props.voice}
                        style={{ width: 200 }}
                        onChange={this.voiceChange}
                    >
                        {this.voiceOpt}
                    </Select>
                    <Popover
                        content={this.popoverContent}
                        title="Enter a file name"
                    >
                        <Button onClick={this.download} type="primary">
                            <i className="fas fa-download" />
                        </Button>
                    </Popover>
                </div>
            </div>
        );
    }
}

export default FileControl;
