import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button, Input, Checkbox, Typography } from 'antd';
import routes from '../../constants/routes.json';

const { Text } = Typography;

export default withRouter(
    class Settings extends Component {
        constructor(props) {
            super(props);
            // // this.dataStore = new DataStore();
            const key = this.props.dataStore.get('key');
            const defaultPath = this.props.dataStore.get('defaultPath');
            const uiTheme = this.props.dataStore.get('uiTheme');
            console.log(key);
            console.log(defaultPath);
            console.log(uiTheme);
            this.state = {
                key: key ? key : '',
                defaultPath: defaultPath ? defaultPath : '',
                uiTheme: uiTheme ? uiTheme : 'light'
            };
        }

        fieldChanged = (key, value) => {
            const state = {};
            state[key] = value;
            this.setState(state);
        };
        saveClicked = () => {
            this.props.dataStore.set('key', this.state.key);
            this.props.dataStore.set('defaultPath', this.state.defaultPath);
            this.props.dataStore.set('uiTheme', this.state.uiTheme);
            this.props.history.push(routes.HOME_MEDIA);
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
                            onChange={e =>
                                this.fieldChanged('key', e.target.value)
                            }
                            placeholder="key"
                            value={this.state.key}
                        />
                    </div>
                    <div className="row settings__group">
                        <Text>Default Path: </Text>
                        <Input
                            onChange={e =>
                                this.fieldChanged('defaultPath', e.target.value)
                            }
                            placeholder="path"
                            value={this.state.defaultPath}
                        />
                    </div>
                    <div className="row">
                        <Checkbox
                            onChange={e => {
                                const val = e.target.checked ? 'dark' : 'light';
                                this.fieldChanged('uiTheme', val);
                            }}
                            defaultChecked={
                                this.state.uiTheme === 'light' ? false : true
                            }
                        >
                            Night Mode
                        </Checkbox>
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
