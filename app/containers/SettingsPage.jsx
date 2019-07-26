import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Settings from '../components/Settings/Settings';

// class HomePage extends Component {
//     constructor(props) {
//         super(props);
//         this.dataStore = new DataStore();
//     }

//     render() {
//         return <Settings dataStore={this.dataStore} />;
//     }
// }

export default connect()(Settings);
