Game.menus.profile.models.overview = new Gui.Menu('rgb(0,150,120)', function(){
	this.addComponent(new Gui.TextComponent('Character models', TextProperties.label()), 0.1, 0.8, 0.4, 0.95);
	this.addComponent(Game.menuComponents.profile.models.serverList, 0.05, 0.3, 0.3, 0.7);
	this.addComponent(Game.menuComponents.profile.models.localList, 0.325, 0.3, 0.575, 0.7);
	this.addComponent(Game.menuComponents.profile.models.selected, 0.6, 0.4, 0.95, 0.7);
	this.addComponent(new Gui.ActivatableTextComponent('Create new', TextProperties.button('rgb(0,0,200)', 'rgb(0,0,50)'), TextProperties.button('rgb(0,0,255)', 'rgb(0,0,80)'), TextProperties.button('rgb(200,0,0)', 'rgb(50,0,0)'), function(){
		window.alert('Create new model...');
	}, function(){
		return Game.profile.modelNames.length < Game.profile.maxModelSlots;
	}), 0.1, 0.1, 0.3, 0.2);
	this.setSelected = function(model){
		Game.menuComponents.profile.models.selected.setSelected(model);
		this.state.getManager().markDirty();
	};
});