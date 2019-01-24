function loadLocalProfileEntityModels(){
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

function saveLocalProfileEntityModels(){
	const output = createLocalStorageOutput('profileEntityModelNames');
	const models = Game.profile.localModelNames;
	const length = models.length;
	output.writeInt(length);
	for (let index = 0; index < length; index++) {
		output.writeJavaString(models[index]);
	}
	output.terminate();
}

function loadLocalProfileEntityModel(name){
	const input = createLocalStorageInput('profileEntityModel_' + name);
	if(input){
		const model = loadProfileEntityModel(input);
		model.isLocal = true;
		return model;
	}
	else {
		return undefined;
	}
}