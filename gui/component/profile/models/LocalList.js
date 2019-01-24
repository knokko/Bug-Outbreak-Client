Game.menuComponents.profile.models.localList = new Gui.Menu('rgb(70,150,120)', function(){
	this.refresh = function(){
		loadLocalProfileEntityModels();
		const modelNames = Game.profile.localModelNames;
		for(let index = 0; index < modelNames.length; index++){
			this.addComponent(new LocalProfileModelListComponent(modelNames[index]), 0, 0.9 - index * 0.1, 1, 1 - index * 0.1);
		}
		this.state.getManager().markDirty();
	}
	this.refresh();
});

function LocalProfileModelListComponent(modelName){
	this.text = modelName;
	this.refreshImages();
}

extendProtoType(Gui.ActivatableTextComponent, LocalProfileModelListComponent);

LocalProfileModelListComponent.prototype.isActive = function(){
	const selectedModel = Game.menuComponents.profile.models.selected.model;
	return selectedModel && selectedModel.name === this.text;
};

LocalProfileModelListComponent.prototype.click = function(){
	const profileModel = loadLocalProfileEntityModel(this.text);
	Game.menus.profile.models.overview.setSelected(profileModel);
};

LocalProfileModelListComponent.prototype.fixedImageWidth = 450;
LocalProfileModelListComponent.prototype.fixedImageHeight = 150;
LocalProfileModelListComponent.prototype.props = TextProperties.listElement('rgb(255,255,255)', 'rgb(150,150,255)');
LocalProfileModelListComponent.prototype.hoverProps = TextProperties.listElement('rgb(200,200,255)', 'rgb(100,100,255)');
LocalProfileModelListComponent.prototype.activeProps = TextProperties.listElement('rgb(100,100,255)', 'rgb(0,0,255)');