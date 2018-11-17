Game.menuComponents.profile.models.serverList = new Gui.Menu('rgb(70,150,120)', function(){
	const modelNames = Game.profile.serverModelNames;
	for(let index = 0; index < modelNames.length; index++){
		this.addComponent(new ProfileModelListComponent(modelNames[index]), 0, 0.9 - index * 0.1, 1, 1 - index * 0.1);
	}
});

function ProfileModelListComponent(modelName){
	this.text = modelName;
	this.refreshImages();
}

extendProtoType(Gui.ActivatableTextComponent, ProfileModelListComponent);

ProfileModelListComponent.prototype.isActive = function(){
	const selectedModel = Game.menus.profile.models.selected.model;
	return selectedModel && selectedModel.name === this.text;
};

ProfileModelListComponent.prototype.click = function(){
	Game.connectionManager.profile.speaker.requestModel(this.text);
};

ProfileModelListComponent.prototype.fixedImageWidth = 450;
ProfileModelListComponent.prototype.fixedImageHeight = 150;
ProfileModelListComponent.prototype.props = TextProperties.listElement('rgb(255,255,255)', 'rgb(150,150,255)');
ProfileModelListComponent.prototype.hoverProps = TextProperties.listElement('rgb(200,200,255)', 'rgb(100,100,255)');
ProfileModelListComponent.prototype.activeProps = TextProperties.listElement('rgb(100,100,255)', 'rgb(0,0,255)');