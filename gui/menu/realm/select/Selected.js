Game.menus.realm.select.selected = new Gui.Menu('rgb(0,150,120)', function(){
	this.onlineComponent = new Gui.TextComponent('Online', TextProperties.label('rgb(0,200,0)'));
	this.offlineComponent = new Gui.TextComponent('Offline', TextProperties.label('rgb(200,0,0)'));
	this.backgroundComponent = new Gui.BackgroundComponent('rgb(0,100,255)');
	this.joinButton = new Gui.TextComponent('Join', TextProperties.button('rgb(0,200,0)', '0,100,0'), TextProperties.button('rgb(0,255,0)', 'rgb(0,150,0)'), function(){
		window.alert('Work in progress');
	});
	this.setSelected = function(realm){
		this.realmName = realm.name;
		this.components = [];
		this.addComponent(this.backgroundComponent, 0, 0, 1, 1);
		this.addComponent(new Gui.TextComponent(realm.name, TextProperties.label(), undefined, undefined, 512, 128), 0.1, 0.8, 0.7, 0.95);
		if(realm.online){
			this.addComponent(this.onlineComponent, 0.1, 0.625, 0.25, 0.7);
			this.addComponent(new Gui.TextComponent('Online players: ' + realm.onlinePlayers + ' / ' + realm.maxOnlinePlayers, TextProperties.label()), 0.1, 0.525, 0.35, 0.6);
			this.addComponent(new Gui.TextComponent('Total players: ' + realm.totalPlayers, TextProperties.label()), 0.1, 0.425, 0.3, 0.5);
			this.addComponent(new Gui.TextComponent('Created at ' + realm.createdAt, TextProperties.label()), 0.1, 0.3, 0.3, 0.375);
			this.addComponent(this.joinButton, 0.7, 0.2, 0.9, 0.3);
		}
		else {
			this.addComponent(this.offlineComponent, 0.1, 0.625, 0.25, 0.7);
		}
	};
});