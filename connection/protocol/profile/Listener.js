(function(){
	const profile = Game.connectionManager.profile;
	const protocolLogin = {
		process : function(input){
			if(profile.state.state === profile.state.STATE_LOGGING_IN){
				profile.state.state = profile.state.STATE_LOGGED_IN;
				Game.menus.main.afterAuth.setActiveTab(Game.menus.profile.overview);
			}
			else {
				weirdProfileServerResponse();
			}
		}
	};
	const protocolGetModelList = {
		process : function(input){
			if(profile.state.state === profile.state.STATE_GETTING_MODELS){
				const amount = input.readChar();
				const maxSlots = input.readChar();
				const models = new Array(amount);
				for(let index = 0; index < amount; index++){
					models[index] = input.readJavaString();
				}
				Game.profile.serverModelNames = models;
				Game.profile.maxModelSlots = maxSlots;
				Game.menus.profile.overview.setActiveTab(Game.menus.profile.models.overview);
				profile.state.state = profile.state.STATE_LOGGED_IN;
			}
			else {
				weirdProfileServerResponse();
			}
		}
	};
	const protocolGetModel = {
		process : function(input){
			if(profile.state.state === profile.state.STATE_GETTING_MODEL){
				const profileModel = loadProfileEntityModel(input);
				Game.profile.models[profile.state.waitingModelName] = profileModel;
				Game.menus.profile.models.overview.setSelected(profileModel);
				profile.state.waitingModelName = undefined;
				profile.state.state = profile.state.STATE_LOGGED_IN;
			}
			else {
				weirdProfileServerResponse();
			}
		}
	};
	const protocolAddedModel = {
		process : function(input){
			if(profile.state.state === profile.state.STATE_ADDING_MODEL){
				profile.state.state = profile.state.STATE_LOGGED_IN;
				window.alert('The model has been added to your models');
			}
			else {
				weirdProfileServerResponse();
			}
		}
	};
	const protocolChangedModel = {
		process : function(input){
			if(profile.state.state === profile.state.STATE_CHANGING_MODEL){
				profile.state.state = profile.state.STATE_LOGGED_IN;
				window.alert('The model has been saved');
			}
			else {
				weirdProfileServerResponse();
			}
		}
	};
	profile.listener = new DomainBitProtocol(profile.code.StC.AMOUNT, profile.code.StC.BITCOUNT);
	profile.listener.register(profile.code.StC.LOGIN, protocolLogin);
	profile.listener.register(profile.code.StC.GET_MODEL_LIST, protocolGetModelList);
	profile.listener.register(profile.code.StC.GET_MODEL, protocolGetModel);
	profile.listener.register(profile.code.StC.ADDED_MODEL, protocolAddedModel);
	profile.listener.register(profile.code.StC.CHANGED_MODEL, protocolChangedModel);
}());