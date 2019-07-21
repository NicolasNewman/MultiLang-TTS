import * as React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const FolderNav = props => {
    console.log(props);
    console.log(props.panes);
    return (
        // <p>Hello</p>
        <Tabs
            // onChange={this.onChange}
            // activeKey={this.state.activeKey}
            type="editable-card"
            // onEdit={this.onEdit}
        >
            {props.panes.map(pane => {
                console.log('here');
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
};

export default FolderNav;
