import { connect } from 'react-redux';
import AppSettings from '../views/settings/AppSettings';
import { updateSleepCycleMode, updateNightMode, updateNotificationsVolume, updateNotificationsVibrate, updateNotificationsDesktop } from '../actions';

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        settings: state.settings
    }
};

const mapDispatchToProps = dispatch => ({
    updateSleepCycleMode: (checkedSleepCycleMode) => {
        dispatch(updateSleepCycleMode(checkedSleepCycleMode));
    },
    updateNightMode: (checkedNightMode) => {
        dispatch(updateNightMode(checkedNightMode));
    },
    updateNotificationsVolume: (volume) => {
        dispatch(updateNotificationsVolume(volume));
    },
    updateNotificationsVibrate: (checkedVibrate) => {
        dispatch(updateNotificationsVibrate(checkedVibrate));
    },
    updateNotificationsDesktop: (checkedDesktop) => {
        dispatch(updateNotificationsDesktop(checkedDesktop));
    }
});

export const AppSettingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppSettings);