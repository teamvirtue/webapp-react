import { connect } from 'react-redux';
import AppSettings from '../views/settings/AppSettings';
import { updateBirthdate, updateSleepCycleMode, updateSleepCycleStartTime, updateSleepCycleEndTime, updateNightMode, updateNotificationsVolume, updateNotificationsVibrate, updateNotificationsDesktop } from '../actions';

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        settings: state.settings
    }
};

const mapDispatchToProps = dispatch => ({
    updateBirthdate: (date) => {
        dispatch(updateBirthdate(date));
    },
    updateSleepCycleMode: (checked) => {
        dispatch(updateSleepCycleMode(checked));
    },
    updateSleepCycleStartTime: (time) => {
        dispatch(updateSleepCycleStartTime(time));
    },
    updateSleepCycleEndTime: (time) => {
        dispatch(updateSleepCycleEndTime(time));
    },
    updateNightMode: (checked) => {
        dispatch(updateNightMode(checked));
    },
    updateNotificationsVolume: (volume) => {
        dispatch(updateNotificationsVolume(volume));
    },
    updateNotificationsVibrate: (checked) => {
        dispatch(updateNotificationsVibrate(checked));
    },
    updateNotificationsDesktop: (checked) => {
        dispatch(updateNotificationsDesktop(checked));
    }
});

export const AppSettingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppSettings);