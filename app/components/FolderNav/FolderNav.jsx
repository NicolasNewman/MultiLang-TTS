import * as React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

class FolderNav extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        this.state = {
            activeKey: this.props.panes[0].key,
            panes: this.props.panes
        };
        // console.log();
    }
    // console.log(props);
    // console.log(props.panes);

    // createNewTab = () => {
    //     console.log('here');
    // };
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };
    add = () => {
        const panes = [...this.state.panes];
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({
            title: 'New tab',
            content: 'content',
            key: activeKey
        });
        this.setState({ panes });
    };

    remove = targetKey => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        this.setState({ panes, activeKey });
    };

    render() {
        console.log(this.state);
        return (
            // <p>Hello</p>
            <Tabs
                // onChange={this.onChange}
                // activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
            >
                {this.state.panes.map(pane => {
                    return (
                        <TabPane
                            tab={pane.title}
                            key={pane.key}
                            // closable={pane.closable}
                        >
                            {pane.content}
                        </TabPane>
                    );
                })}
            </Tabs>
        );
    }
}

export default FolderNav;
