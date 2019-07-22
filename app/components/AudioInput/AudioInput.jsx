import React, { Component } from 'React';
import { Input } from 'antd';

const { TextArea } = Input;

export default class AudioInput extends Component {
    getText(e) {
        console.log(e.target.value);
        this.props.setInput(e.target.value);
    }
    render() {
        return (
            // <div>
            <TextArea onChange={this.getText.bind(this)} autosize={true} />
            // </div>
        );
    }
}
