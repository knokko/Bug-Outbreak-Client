function loadLocalProfileModels(){
	let models;
	const input = createLocalStorageInput('profileEntityModelNames');
	if(input){
		const amount = input.readInt();
		models = new Array(amount);
		for(let index = 0; index < amount; index++){
			models[index] = input.readJavaString();
		}
	}
	else {
		models = [];
	}
	Game.profile.localModelNames = models;
}

function loadLocalProfileModel(name){
	const input = createLocalStorageInput('profileEntityModel' + name);
	if(input){
		const model= loadProfileEntityModel(input);
		model.isLocal = true;
		return model;
	}
	else {
		return undefined;
	}
}