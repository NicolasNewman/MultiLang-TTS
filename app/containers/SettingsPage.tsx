import { connect } from 'react-redux';
import Settings from '../components/Settings/Settings';

export interface SettingsState {
    dataStore: any;
}

const mapStateToProps = (state: SettingsState, ownProps) => {
    return {
        dataStore: ownProps.dataStore
    };
};

export default connect(mapStateToProps)(Settings);
