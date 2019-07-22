import React, { Component } from 'react';
import { Button, Slider } from 'antd';
import { Select } from 'antd';

const { Option, OptGroup } = Select;

class FileControl extends Component {
    constructor(props) {
        super(props);

        this.voices = props.getVoices(); // TODO: could be undefined!
        this.createSelects();
    }

    download = () => {
        console.log(this.props.targetFolder);
        console.log(this.props.text);
        this.props.makeRequest.call(undefined, this.props.text);
    };

    createSelects = () => {
        this.langOpt = [];
        for (let lang in this.voices) {
            this.langOpt.push(
                <Option key={lang} value={lang}>
                    {lang}
                </Option>
            );
        }
    };
    render() {
        return (
            <div className="controls">
                <div className="controls__buttons">
                    <Select style={{ width: 90 }}>{this.langOpt}</Select>
                    <Button onClick={this.download} type="primary">
                        <i className="fas fa-download" />
                    </Button>
                </div>
            </div>
        );
    }
}

export default FileControl;
