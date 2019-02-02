(function(){
	const auth = Game.connectionManager.auth;
	auth.speaker = {
		login1 : function(username, password){
			if(auth.state.state === auth.state.STATE_DEFAULT){
				auth.startConnection();

				const halfServerSeed = new PseudoRandom().nextInts(24);
				auth.state.login.password = password;
				auth.state.login.halfServerSeed = halfServerSeed;
				auth.state.state = auth.state.STATE_LOGIN_1;

				const output = auth.connection.createOutput();
				output.writeNumber(auth.code.CtS.LOGIN_1, auth.code.CtS.BITCOUNT, false);
				output.writeString(username);
				output.writeInts(halfServerSeed);
				output.terminate();
			}
			else {
				Game.menus.main.login.setLoginError("You can't login while you are authenticating or logged in.");
			}
		},
		login2 : function(salt, halfClientSeed){
			if(auth.state.state === auth.state.STATE_LOGIN_1){
				const password = auth.state.login.password;
				const clientHash = Hasher.clientHash(password, salt);

				const clientStartSeedEncryptor = new Hasher.SimpleEncryptor(Hasher.createRandom(clientHash.serverStartSeed, halfClientSeed));
				
				auth.state.state = auth.state.STATE_LOGIN_2;
				auth.state.login.password = null;
				auth.state.login.clientHash = clientHash;

				const output = auth.connection.createOutput();
				output.writeNumber(auth.code.CtS.LOGIN_2, auth.code.CtS.BITCOUNT, false);
				output.writeByteArray(clientStartSeedEncryptor.encrypt(clientHash.clientStartSeed));
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
				const clientHash = Hasher.clientHash(password, salt);
				
				const output = auth.connection.createOutput();
				output.writeNumber(auth.code.CtS.REGISTER, auth.code.CtS.BITCOUNT, false);
				output.writeString(username);
				output.writeString(salt);
				output.writeBytes(clientHash.testPayload);
				output.writeInts(clientHash.serverStartSeed);
				output.writeInts(clientHash.clientSessionSeed);
				output.writeInts(clientHash.serverSessionSeed);
				auth.state.state = auth.state.STATE_REGISTER;
				output.terminate();
			}
			else {
				Game.menus.main.register.setRegisterError("You can't register while you are authenticating or logged in.");
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