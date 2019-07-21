import React, { Component } from 'React';
import { Input } from 'antd';

const { TextArea } = Input;

export default class AudioInput extends Component {
    render() {
        return (
            // <div>
            <TextArea autosize={true} />
            // </div>
        );
    }
}
