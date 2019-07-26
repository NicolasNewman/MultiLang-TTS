import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Settings from '../components/Settings/Settings';

const mapStateToProps = (state, ownProps) => {
    return {
        dataStore: ownProps.dataStore
    };
};

export default connect(mapStateToProps)(Settings);
