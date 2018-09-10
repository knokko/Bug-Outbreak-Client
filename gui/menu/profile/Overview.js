Game.menus.profile.overview = new Gui.Menu('rgb(0, 150, 120)', function(){
	this.tabProperties = TextProperties.tab('rgb(90,150,120)', 'rgb(0,150,120)');
	this.tabHoverProperties = TextProperties.hoverTab('rgb(70,150,120)', 'rgb(0,150,120)');
	this.tabActiveProperties = TextProperties.tab('rgb(0,150,120)', 'rgb(0,150,120)');
	this.tabComponent = new Gui.WrapperComponent(new Gui.BackgroundComponent('rgb(0,150,120)'));
	this.addComponent(this.tabComponent, 0, 0, 1, 0.95);
	this.addComponent(new Gui.BackgroundComponent('rgb(120,150,120)'), 0, 0.95, 1, 1);
	this.addComponent(new Gui.ActivatableTextComponent('Character models', this.tabProperties, this.tabHoverProperties, this.tabActiveProperties, function(){
		Game.connectionManager.profile.speaker.requestModels();
	}, function(){
		return Game.menus.profile.overview.tabComponent.component === Game.menus.profile.models.overview;
	}), 0, 0.95, 0.1, 1);
	this.setActiveTab = function(menu){
		this.tabComponent.setComponent(menu);
	};
});