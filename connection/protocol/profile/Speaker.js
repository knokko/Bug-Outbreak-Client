(function(){
	const profile = Game.connectionManager.profile;
	profile.speaker = {
		login : function(){
			if(profile.state.state === profile.state.STATE_DEFAULT){
				const output = profile.connection.createOutput();
				output.writeNumber(profile.code.CtS.LOGIN, profile.code.CtS.BITCOUNT, false);
				output.writeInts(profile.state.authKey);
				output.terminate();
				profile.state.state = profile.state.STATE_LOGGING_IN;
			}
			else {
				window.alert("You can't log in now");
			}
		},
		requestModels : function(){
			if(profile.state.state === profile.state.STATE_DEFAULT){
				profile.startConnection();
			}
			else if(profile.state.canRequest()){
				const output = profile.connection.createOutput();
				output.writeNumber(profile.code.CtS.GET_MODEL_LIST, profile.code.CtS.BITCOUNT, false);
				profile.state.state = profile.state.STATE_GETTING_MODELS;
				output.terminate();
			}
			else {
				window.alert("You can't request the models right now");
			}
		},
		requestModel : function(name){
			if(profile.state.canRequest()){
				const output = profile.connection.createOutput();
				output.writeNumber(profile.code.CtS.GET_MODEL, profile.code.CtS.BITCOUNT, false);
				output.writeJavaString(name);
				profile.state.state = profile.state.STATE_GETTING_MODEL;
				profile.state.waitingModelName = name;
				output.terminate();
			}
			else {
				window.alert("You can't request a model right now");
			}
		}
	};
}());