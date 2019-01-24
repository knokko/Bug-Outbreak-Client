function ProfileEntityModel(model, name, createdAt, lastModified){
	this.model = model;
	this.name = name;
	this.createdAt = createdAt;
	this.lastModified = lastModified;
	this.isLocal = false;
}

function loadProfileEntityModel(input){
	const encoding = input.readByte();
	if(encoding === Game.connectionManager.profile.code.StC.modelEncoding.ENCODING_1){
		return loadProfileEntityModel1(input);
	}
	else {
		throw 'Unknown encoding: ' + encoding;
	}
}

function loadProfileEntityModel1(input){
	const model = Game.models.loadModel(input);
	const name = input.readJavaString();
	const createdAt = input.readJavaString();
	const lastModified = input.readJavaString();
	return new ProfileEntityModel(model, name, createdAt, lastModified);
}

function saveProfileEntityModel(model, output){
	console.log('saveProfileEntityModel');
	saveProfileEntityModel1(model, output);
}

function saveProfileEntityModel1(model, output){
	output.writeByte(Game.connectionManager.profile.code.StC.modelEncoding.ENCODING_1);
	Game.models.saveModelBuilder(model.model, output);
	output.writeJavaString(model.name);

	// TODO something really weird happens to the data
	console.log('write length of createdAt ' + model.createdAt.length);
	output.writeJavaString(model.createdAt);
	console.log('write length of lastModified ' + model.lastModified.length);
	output.writeJavaString(model.lastModified);
}