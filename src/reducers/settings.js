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
		default:
			return state;
	}
};

export default settings