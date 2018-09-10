Game.connectionManager.auth.code = {
	CtS : {
		LOGIN_1 : 0,
		LOGIN_2 : 1,
		REGISTER : 2,
		REALM_LIST : 3,
		ACCOUNT_DATA : 4,
		PROFILE : 5,
		REALM_INFO : 6,
		
		BITCOUNT : 3,
		AMOUNT : 7
	},
	StC: {
		LOGIN_1 : 0,
		LOGIN_1_FAILED : 1,
		LOGIN_2 : 2,
		LOGIN_2_FAILED : 3,
		REGISTER : 4,
		REGISTER_FAILED : 5,
		REALM_LIST : 6,
		ACCOUNT_DATA : 7,
		PROFILE_LOGIN : 8,
		PROFILE_LOGIN_FAILED : 9,
		REALM_INFO : 10,
		
		BITCOUNT : 4,
		AMOUNT : 11,
		
		LoginFail1 : {
			NO_USERNAME : 0,
			ALREADY_LOGGED_IN : 1,
			UNDER_ATTACK : 2,
			
			BITCOUNT : 2
		},
		LoginFail2 : {
			WRONG_PASSWORD : 0,
			ALREADY_LOGGED_IN : 1,
			
			BITCOUNT : 1
		},
		RegisterFail : {
			NAME_IN_USE : 0,
			IP_LIMIT_EXCEEDED : 1,
			
			BITCOUNT : 1
		},
		ProfileFail : {
			SERVER_DOWN : 0,
			ADDRESS_UNKNOWN : 1,
			
			BITCOUNT : 1
		}
	}
};