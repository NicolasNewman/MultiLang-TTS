import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button, Input, Typography } from 'antd';
import routes from '../../constants/routes.json';

const { Text } = Typography;

export default withRouter(
    class Settings extends Component {
        constructor(props) {
            super(props);
            // // this.dataStore = new DataStore();
            const key = this.props.dataStore.get('key');
            const defaultPath = this.props.dataStore.get('defaultPath');
            console.log(key);
            console.log(defaultPath);
            this.state = {
                key: key ? key : '',
                defaultPath: defaultPath ? defaultPath : ''
            };
        }

        fieldChanged = (value, e) => {
            const state = {};
            state[value] = e.target.value;
            this.setState(state);
        };
        saveClicked = () => {
            this.props.dataStore.set('key', this.state.key);
            this.props.dataStore.set('defaultPath', this.state.defaultPath);
            // this.props.history.push(routes.HOME_MEDIA);
        };

        cancelClicked = () => {
            this.props.history.push(routes.HOME_MEDIA);
        };
        render() {
            console.log(this.props.dataStore);
            console.log(this);
            return (
                <div className="settings">
                    <div className="row settings__group">
                        <Text>API Key: </Text>
                        <Input
                            onChange={e => this.fieldChanged('key', e)}
                            placeholder="key"
                            value={this.state.key}
                        />
                    </div>
                    <div className="row settings__group">
                        <Text>Default Path: </Text>
                        <Input
                            onChange={e => this.fieldChanged('defaultPath', e)}
                            placeholder="path"
                            value={this.state.defaultPath}
                        />
                    </div>
                    <div className="row">
                        <Button onClick={this.saveClicked} type="primary">
                            Save
                        </Button>
                        <Button onClick={this.cancelClicked} type="default">
                            Cancel
                        </Button>
                    </div>
                </div>
            );
        }
    }
);
