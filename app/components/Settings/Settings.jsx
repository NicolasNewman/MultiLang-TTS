import * as React from 'react';
import { Button, Input, Typography } from 'antd';

const { Text } = Typography;

export default class Settings extends React.Component {
    render() {
        return (
            <div className="settings">
                <div className="row settings__group">
                    <Text>API Key: </Text>
                    <Input placeholder="key" />
                </div>
                <div className="row settings__group">
                    <Text>API Key: </Text>
                    <Input placeholder="key" />
                </div>
                <div className="row">
                    <Button type="primary">Save</Button>
                    <Button type="default">Cancel</Button>
                </div>
            </div>
        );
    }
}
