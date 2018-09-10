(function(){
	const auth = Game.connectionManager.auth;
	const profile = Game.connectionManager.profile;
	const protocolLogin1 = {
		process : function(input){
			if(auth.state.state === auth.state.STATE_LOGIN_1){
				const salt = input.readJavaString();
				const tempHasher = input.readInts(4);
				auth.speaker.login2(salt, tempHasher);
			}
			else {
				weirdServerResponse();
			}
		}
	};
	const protocolLoginFail1 = {
		process : function(input){
			if(auth.state.state === auth.state.STATE_LOGIN_1){
				auth.state.state = auth.state.STATE_DEFAULT;
				const reasonCode = input.readNumber(auth.code.StC.LoginFail1.BITCOUNT, false);
				const lf = auth.code.StC.LoginFail1;
				if(reasonCode === lf.NO_USERNAME){
					Game.menus.main.login.setLoginError('There is no account with that name');
				}
				else if(reasonCode === lf.ALREADY_LOGGED_IN){
					Game.menus.main.login.setLoginError('This account is already logged in.');
				}
				else if(reasonCode === lf.UNDER_ATTACK){
					Game.menus.main.login.setLoginError("You can't try to log in with this account because you failed too many times today and multiply people are trying to get access to this account");
				}
				else {
					weirdServerResponse();
				}
			}
			else {
				weirdServerResponse();
			}
		}
	};
	const protocolLogin2 = {
		process : function(input){
			if(auth.state.state === auth.state.STATE_LOGIN_2){
				auth.state.password = undefined;
				auth.state.op = input.readBoolean();
				auth.state.state = auth.state.STATE_LOGGED_IN;
				Game.guiManager.setMainComponent(Game.menus.main.afterAuth);
			}
			else {
				weirdServerResponse();
			}
		}
	};
	const protocolLoginFail2 = {
		process : function(input){
			if(auth.state.state === auth.state.STATE_LOGIN_2){
				auth.state.password = undefined;
				auth.state.state = auth.state.STATE_DEFAULT;
				const reasonCode = input.readNumber(auth.code.StC.LoginFail2.BITCOUNT, false);
				if(reasonCode === auth.code.StC.LoginFail2.WRONG_PASSWORD){
					Game.menus.main.login.setLoginError('The password is incorrect');
				}
				else if(reasonCode === auth.code.StC.LoginFail2.ALREADY_LOGGED_IN){
					Game.menus.main.login.setLoginError('This account is already logged in');
				}
				else {
					weirdServerResponse();
				}
			}
			else {
				weirdServerResponse();
			}
		}
	};
	const protocolRegister = {
		process : function(input){
			if(auth.state.state === auth.state.STATE_REGISTER){
				auth.state.state = auth.state.STATE_LOGGED_IN;
				Game.guiManager.setMainComponent(Game.menus.main.afterAuth);
			}
			else {
				weirdServerResponse();
			}
		}
	};
	const protocolRegisterFailed = {
		process : function(input){
			if(auth.state.state === auth.state.STATE_REGISTER){
				auth.state.state = auth.state.STATE_DEFAULT;
				const reasonCode = input.readNumber(auth.code.StC.RegisterFail.BITCOUNT, false);
				if(reasonCode === auth.code.StC.RegisterFail.NAME_IN_USE){
					Game.menus.main.register.setRegisterError('This username has been taken already');
				}
				else if(reasonCode === auth.code.StC.RegisterFail.IP_LIMIT_EXCEEDED){
					Game.menus.main.register.setRegisterError('Your IP address has reached the limit of 10 accounts');
				}
				else {
					weirdServerResponse();
				}
			}
			else {
				weirdServerResponse();
			}
		}
	};
	const protocolProfileLogin = {
		process : function(input){
			if(auth.state.actionState === auth.state.ACTION_STATE_PROFILE_LOGIN){
				const profileAddress = input.readByteArray();
				const profilePort = input.readChar();
				const authKey = input.readInts(8);
				profile.startConnection(authKey, profileAddress, profilePort);
				auth.state.actionState = auth.state.ACTION_STATE_NOTHING;
			}
			else {
				weirdServerResponse();
			}
		}
	};
	const protocolProfileLoginFailed = {
		process : function(input){
			if(auth.state.actionState === auth.state.ACTION_STATE_PROFILE_LOGIN){
				const reason = input.readNumber();
				if(reason === auth.code.StC.ProfileFail.SERVER_DOWN){
					window.alert("The profile server appears to be down");
				}
				else if(reason === auth.code.StC.ProfileFail.ADDRESS_UNKNOWN){
					window.alert("It looks like the authentication server is not yet ready");
				}
				else {
					weirdServerResponse();
				}
				auth.state.actionState = auth.state.ACTION_STATE_NOTHING;
			}
			else {
				weirdServerResponse();
			}
		}
	};
	const protocolRealmList = {
		process : function(input){
			if(auth.state.actionState === auth.state.ACTION_STATE_REALM_LIST){
				const amount = input.readInt();
				Game.realms = new Array(amount);
				for(let index = 0; index < amount; index++){
					Game.realms[index] = {
						name : input.readJavaString()
					}
				}
				auth.state.actionState = auth.state.ACTION_STATE_NOTHING;
				Game.menus.main.afterAuth.setActiveTab(Game.menus.realm.select.overview);
				Game.menus.realm.select.list.refresh();
			}
			else {
				weirdServerResponse();
			}
		}
	};
	const protocolAccountData = {
		process : function(input){
			if(auth.state.actionState === auth.state.ACTION_STATE_ACCOUNT_DATA){
				Game.account = {
					id : input.readJavaString(),
					username : input.readJavaString()
				};
				const creationAddress = input.readByteArray();
				let creationString = '';
				creationString += creationAddress[0] & 0xFF;
				for(let index = 1; index < creationAddress.length; index++){
					creationString += '.';
					creationString += creationAddress[index] & 0xFF;
				}
				Game.account.creationAddress = creationString;
				auth.state.actionState = auth.state.ACTION_STATE_NOTHING;
				Game.menus.main.afterAuth.setActiveTab(Game.menus.account.overview);
			}
			else {
				weirdServerResponse();
			}
		}
	};
	const protocolRealmInfo = {
		process : function(input){
			if(auth.state.actionState === auth.state.ACTION_STATE_REALM_INFO){
				if(input.readBoolean()){
					const realmName = auth.state.waitingForRealmInfo;
					let realm = undefined;
					for(let index = 0; index < Game.realms.length; index++){
						if(Game.realms[index].name === realmName){
							realm = Game.realms[index];
							break;
						}
					}
					realm.online = input.readBoolean();
					realm.onlinePlayers = input.readInt();
					realm.maxOnlinePlayers = input.readInt();
					realm.totalPlayers = input.readInt();
					realm.createdAt = input.readJavaString();
					Game.menus.realm.overview.setSelected(realm);
				}
				else {
					window.alert('The realm no longer exists');
				}
			}
			else {
				weirdServerResponse();
			}
		}
	};
	auth.listener = new DomainBitProtocol(auth.code.StC.AMOUNT, auth.code.StC.BITCOUNT);
	auth.listener.register(auth.code.StC.LOGIN_1, protocolLogin1);
	auth.listener.register(auth.code.StC.LOGIN_1_FAILED, protocolLoginFail1);
	auth.listener.register(auth.code.StC.LOGIN_2, protocolLogin2);
	auth.listener.register(auth.code.StC.LOGIN_2_FAILED, protocolLoginFail2);
	auth.listener.register(auth.code.StC.REGISTER, protocolRegister);
	auth.listener.register(auth.code.StC.REGISTER_FAILED, protocolRegisterFailed);
	auth.listener.register(auth.code.StC.PROFILE_LOGIN, protocolProfileLogin);
	auth.listener.register(auth.code.StC.PROFILE_LOGIN_FAILED, protocolProfileLoginFailed);
	auth.listener.register(auth.code.StC.REALM_LIST, protocolRealmList);
	auth.listener.register(auth.code.StC.ACCOUNT_DATA, protocolAccountData);
	auth.listener.register(auth.code.StC.REALM_INFO, protocolRealmInfo);
}());