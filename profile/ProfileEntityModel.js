function ProfileEntityModel(model, name, createdAt, lastModified){
	this.model = model;
	this.name = name;
	this.createdAt = createdAt;
	this.lastModified = lastModified;
}

function loadProfileEntityModel(input){
	const encoding = input.readByte();
	if(encoding === Game.connectionManager.profile.code.modelEncoding.ENCODING_1){
		return loadProfileEntityModel1(input);
	}
	else {
		throw 'Unknown encoding: ' + encoding;
	}
}

function loadProfileEntityModel1(input){
	return new ProfileEntityModel(new EntityModel(input), input.readJavaString(), input.readJavaString(), input.readJavaString());
}