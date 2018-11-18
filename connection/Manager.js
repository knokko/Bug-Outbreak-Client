Game.connectionManager = {
	auth : {
		state: {
			STATE_DEFAULT : 0,
			STATE_LOGIN_1 : 1,
			STATE_LOGIN_2 : 2,
			STATE_REGISTER : 3,
			STATE_LOGGED_IN : 4,
			
			ACTION_STATE_NOTHING : 0,
			ACTION_STATE_PROFILE_LOGIN : 1,
			ACTION_STATE_REALM_LIST : 2,
			ACTION_STATE_ACCOUNT_DATA : 3,
			ACTION_STATE_REALM_INFO : 4,
			
			password : undefined,
			waitingForRealmInfo : undefined,
			op : false,
			state : 0,
			actionState : 0
		},
		startConnection : function(){
			if(this.connection === undefined){
				const auth = this;
				this.connection = new WebClient.Connection(AUTH_SERVER_IP, AUTH_SERVER_PORT, function(input){
					auth.listener.process(input);
				}, function(event){
					auth.state.password = undefined;
					auth.state.state = auth.state.STATE_DEFAULT;
					console.log('Connection has been closed', event);
					Game.guiManager.setMainComponent(Game.menus.main.login);
					window.alert('Disconnected from server');
					auth.connection = undefined;
				}, function(event){
					console.log('Connection has been opened', event);
				}, function(event){
					auth.state.password = undefined;
					auth.state.state = auth.state.STATE_DEFAULT;
					auth.connection = undefined;
					Game.guiManager.setMainComponent(Game.menus.main.login);
					window.alert("Can't connect to the authentication server");
				});
			}
		},
		closeConnection : function(){
			if(this.connection !== undefined){
				this.connection.close();
			}
		}
	},
	profile : {
		state : {
			STATE_DEFAULT : 0,
			STATE_REQUESTING_KEY : 1,
			STATE_LOGGING_IN : 2,
			STATE_LOGGED_IN : 3,
			STATE_GETTING_MODELS : 4,
			STATE_GETTING_MODEL : 5,
			STATE_ADDING_MODEL : 6,
			STATE_CHANGING_MODEL : 7,
			
			state : 0,
			op : false,
			waitingModelName : undefined,
			canRequest : function(){
				return this.state === this.STATE_LOGGED_IN || this.state === this.STATE_GETTING_MODEL;
			}
		},
		startConnection : function(authKey, address, port){
			if(this.connection === undefined){
				const profile = this;
				this.state.authKey = authKey;
				let stringAddress = '';
				stringAddress += address[0] & 0xFF;
				for(let index = 1; index < address.length; index++){//I am afraid this won't work for IPv6 addresses
					stringAddress += '.';
					stringAddress += address[index] & 0xFF;
				}
				console.log('address', address);
				console.log('stringAddress is ' + stringAddress + ' and port is ' + port);
				this.connection = new WebClient.Connection(stringAddress, port, function(input){
					profile.listener.process(input);
				}, function(event){
					profile.state.state = profile.state.STATE_DEFAULT;
					console.log('Connection with profile server has been closed', event);
					window.alert('Disconnected from profile server');
					profile.connection = undefined;
				}, function(event){
					console.log('Connection with profile server has been opened', event);
					profile.speaker.login();
				}, function(event){
					profile.state.state = profile.state.STATE_DEFAULT;
					profile.connection = undefined;
					Game.guiManager.setMainComponent(Game.menus.afterAuthMenu);
					window.alert("Can't connect to the profile server");
				});
			}
		},
		closeConnection : function(){
			if(this.connection !== undefined){
				this.connection.close();
			}
		}
	}
};