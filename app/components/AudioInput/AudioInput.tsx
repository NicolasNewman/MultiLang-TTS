import * as React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

interface IProps {
    setInput: (text: string) => void;
    text: string;
}

export default class AudioInput extends React.Component<IProps> {
    props: IProps;

    getText(e) {
        console.log(e.target.value);
        this.props.setInput(e.target.value);
    }

    render() {
        return (
            <TextArea
                value={this.props.text}
                onChange={this.getText.bind(this)}
                autosize={true}
            />
        );
    }
}
