function EntityModel(input){
	this.skeleton = new EntitySkeleton(input);
	this.texture = new EntityTexture(input);
	this.model = new RawEntityModel(input);
}

EntityModel.prototype.save = function(output){
	this.skeleton.save(output);
	this.texture.save(output);
	this.model.save(output);
};