import * as React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

interface IProps {
    setInput: (text: string) => void;
}

export default class AudioInput extends React.Component<IProps> {
    props: IProps;

    getText(e) {
        console.log(e.target.value);
        this.props.setInput(e.target.value);
    }

    render() {
        return <TextArea onChange={this.getText.bind(this)} autosize={true} />;
    }
}
