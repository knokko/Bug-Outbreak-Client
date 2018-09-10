(function(){
	const auth = Game.connectionManager.auth;
	auth.speaker = {
		login1 : function(username, password){
			if(auth.state.state === auth.state.STATE_DEFAULT){
				auth.startConnection();
				const output = auth.connection.createOutput();
				output.writeNumber(auth.code.CtS.LOGIN_1, auth.code.CtS.BITCOUNT, false);
				output.writeJavaString(username);
				auth.state.password = password;
				auth.state.state = auth.state.STATE_LOGIN_1;
				output.terminate();
			}
			else {
				Game.menus.loginMenu.setLoginError("You can't login while you are authenticating or logged in.");
			}
		},
		login2 : function(salt, tempHasher){
			if(auth.state.state === auth.state.STATE_LOGIN_1){
				const password = auth.state.password;
				const clientHashResult = Hasher.clientHash(password, salt);
				const tempHashResult = Hasher.tempHash(clientHashResult.hashResult, tempHasher[0], tempHasher[1], tempHasher[2], tempHasher[3]);
				
				const output = auth.connection.createOutput();
				output.writeNumber(auth.code.CtS.LOGIN_2, auth.code.CtS.BITCOUNT, false);
				output.writeInts(tempHashResult.result);
				output.writeInts(clientHashResult.encryptor);
				auth.state.state = auth.state.STATE_LOGIN_2;
				auth.state.password = undefined;
				output.terminate();
			}
			else {
				window.alert("Calling login2 shouldn't be possible...");
			}
		},
		register : function(username, password){
			if(auth.state.state === auth.state.STATE_DEFAULT){
				auth.startConnection();
				const salt = username + new Date().getTime();
				const clientHashResult = Hasher.clientHash(password, salt);
				const encryptedHashResult = Hasher.encrypt(clientHashResult.hashResult, clientHashResult.encryptor);
				
				const output = auth.connection.createOutput();
				output.writeNumber(auth.code.CtS.REGISTER, auth.code.CtS.BITCOUNT, false);
				output.writeJavaString(username);
				output.writeJavaString(salt);
				output.writeInts(encryptedHashResult.result);
				auth.state.state = auth.state.STATE_REGISTER;
				output.terminate();
			}
			else {
				Game.menus.registerMenu.setRegisterError("You can't register while you are authenticating or logged in.");
			}
		},
		profileLogin : function(){
			if(auth.state.state === auth.state.STATE_LOGGED_IN){
				if(auth.state.actionState === auth.state.ACTION_STATE_NOTHING){
					const output = auth.connection.createOutput();
					output.writeNumber(auth.code.CtS.PROFILE, auth.code.CtS.BITCOUNT, false);
					auth.state.actionState = auth.state.ACTION_STATE_PROFILE_LOGIN;
					output.terminate();
				}
				else {
					window.alert('You can only perform 1 request at a time');
				}
			}
			else {
				window.alert("You need to authenticate first");
			}
		},
		realmList : function(){
			if(auth.state.state === auth.state.STATE_LOGGED_IN){
				if(auth.state.actionState === auth.state.ACTION_STATE_NOTHING){
					const output = auth.connection.createOutput();
					output.writeNumber(auth.code.CtS.REALM_LIST, auth.code.CtS.BITCOUNT, false);
					auth.state.actionState = auth.state.ACTION_STATE_REALM_LIST;
					output.terminate();
				}
				else {
					window.alert('You can only perform 1 request at a time');
				}
			}
			else {
				window.alert("You need to authenticate first");
			}
		},
		accountData : function(){
			if(auth.state.state === auth.state.STATE_LOGGED_IN){
				if(auth.state.actionState === auth.state.ACTION_STATE_NOTHING){
					const output = auth.connection.createOutput();
					output.writeNumber(auth.code.CtS.ACCOUNT_DATA, auth.code.CtS.BITCOUNT, false);
					auth.state.actionState = auth.state.ACTION_STATE_ACCOUNT_DATA;
					output.terminate();
				}
				else {
					window.alert('You can only perform 1 request at a time');
				}
			}
			else {
				window.alert("You need to authenticate first");
			}
		},
		realmInfo : function(realmName){
			if(auth.state.state === auth.state.STATE_LOGGED_IN){
				if(auth.state.actionState === auth.state.ACTION_STATE_NOTHING){
					const output = auth.connection.createOutput();
					output.writeNumber(auth.code.CtS.REALM_INFO, auth.code.CtS.BITCOUNT, false);
					output.writeJavaString(realmName);
					auth.state.actionState = auth.state.ACTION_STATE_REALM_INFO;
					auth.state.waitingForRealmInfo = realmName;
					output.terminate();
				}
				else {
					window.alert('You can only perform 1 request at a time');
				}
			}
			else {
				window.alert("You need to authenticate first");
			}
		}
	};
}());