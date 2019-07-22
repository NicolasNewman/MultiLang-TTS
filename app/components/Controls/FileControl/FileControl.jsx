import React, { Component } from 'react';
import { Button, Slider } from 'antd';
import { Select } from 'antd';

const { Option, OptGroup } = Select;

class FileControl extends Component {
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
        console.log(this.state.langTarget);
        console.log(this.state.voiceTarget);
        this.props.makeRequest.call(undefined, this.props.text);
    };

    langChange = lang => {
        this.props.setLang(lang);
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
                        style={{ width: 175 }}
                        onChange={this.voiceChange}
                    >
                        {this.voiceOpt}
                    </Select>
                    <Button onClick={this.download} type="primary">
                        <i className="fas fa-download" />
                    </Button>
                </div>
            </div>
        );
    }
}

export default FileControl;
