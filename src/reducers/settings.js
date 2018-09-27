// import * as types from '../constants/ActionTypes'
import accountPicture1 from '../assets/accounts/1.jpg';
import accountPicture2 from '../assets/accounts/2.jpg';
// import accountPicture3 from '../assets/accounts/3.jpg';

const settings = (state = {
	accounts: {
		byId: {
			'user1': {
				id: 'user1',
				name: 'Jane',
				imgName: accountPicture2,
			},
			'user2': {
				id: 'user2',
				name: 'John',
				// name: 'Manar Bishara',
				imgName: accountPicture1,
			},
			/*'user3': {
				id: 'user3',
				name: 'Sara Abadi',
				imgName: accountPicture2,
			},
			'user3': {
				id: 'user3',
				name: 'Jane Doe',
				imgName: accountPicture3,
			},*/
		},
		allIds: ['user1', 'user2'],
		currentUser: ['user1'],
	},
	birthdate: new Date('October 12, 1986 11:13:00'),
	checkedSleepCycleMode: true,
	sleepCycleStartTime: new Date('January 1, 2018 07:00:00'),
	sleepCycleEndTime: new Date('January 1, 2018 17:00:00'),
	checkedNightMode: true,
	notificationsVolume: 5,
	checkedNotificationsVibrate: false,
	checkedNotificationsDesktop: false,
}, action) => {
	switch (action.type) {
        case 'UPDATE_ACCOUNT_NAME':
		    // console.log(action.payload.id);
			return {
                ...state,
				accounts: {
					...state.accounts,
					byId: {
						...state.accounts.byId,
						[action.payload.id]: {
							...state.accounts.byId[action.payload.id],
							name: action.payload.name,
						}
					}
				}
            };

        case 'UPDATE_BIRTHDATE':
			return {
                ...state,
				birthdate: action.payload.date,
            };

        case 'UPDATE_SLEEP_CYCLE_MODE':
			return {
                ...state,
				checkedSleepCycleMode: action.payload.check,
            };

        case 'UPDATE_SLEEP_CYCLE_START_TIME':
			return {
                ...state,
				sleepCycleStartTime: action.payload.time,
            };

        case 'UPDATE_SLEEP_CYCLE_END_TIME':
			return {
                ...state,
				sleepCycleEndTime: action.payload.time,
            };

        case 'UPDATE_NIGHT_MODE':
			return {
                ...state,
				checkedNightMode: action.payload.check,
            };

        case 'UPDATE_NOTIFICATIONS_VOLUME':
			return {
                ...state,
				notificationsVolume: action.payload.volume,
            };

        case 'UPDATE_NOTIFICATIONS_VIBRATE':
			return {
                ...state,
				checkedNotificationsVibrate: action.payload.check,
            };

        case 'UPDATE_NOTIFICATIONS_DESKTOP':
			return {
                ...state,
				checkedNotificationsDesktop: action.payload.check,
            };
			
		default:
			return state;
	}
};

export default settings