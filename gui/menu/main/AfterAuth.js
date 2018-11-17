Game.menus.main.afterAuth = new Gui.Menu('rgb(0, 150, 120)', function(){
	this.tabProperties = TextProperties.tab('rgb(90,150,120)', 'rgb(0,150,120)');
	this.tabHoverProperties = TextProperties.hoverTab('rgb(70,150,120)', 'rgb(0,150,120)');
	this.tabActiveProperties = TextProperties.tab('rgb(0,150,120)', 'rgb(0,150,120)');
	this.tabComponent = new Gui.WrapperComponent(new Gui.BackgroundComponent('rgb(0,150,120)'));
	this.addComponent(this.tabComponent, 0, 0, 1, 0.95);
	this.addComponent(new Gui.BackgroundComponent('rgb(120,150,120)'), 0, 0.95, 1, 1);
	this.addComponent(new Gui.ActivatableTextComponent('Play', this.tabProperties, this.tabHoverProperties, this.tabActiveProperties, function(){
		Game.connectionManager.auth.speaker.realmList();
		// Here, I ask a new realm list intentionally to force an update
	}, function(){
		return Game.menus.main.afterAuth.tabComponent.component === Game.menus.realm.select.overview;
	}), 0, 0.95, 0.1, 1);
	this.addComponent(new Gui.ActivatableTextComponent('Profile', this.tabProperties, this.tabHoverProperties, this.tabActiveProperties, function(){
		if (Game.connectionManager.profile.state.state === Game.connectionManager.profile.state.STATE_LOGGED_IN) {
			Game.menus.main.afterAuth.setActiveTab(Game.menus.profile.overview);
		} else {
			Game.connectionManager.auth.speaker.profileLogin();
		}
	}, function(){
		return Game.menus.main.afterAuth.tabComponent.component === Game.menus.profile.overview;
	}), 0.11, 0.95, 0.21, 1);
	this.addComponent(new Gui.ActivatableTextComponent('Account', this.tabProperties, this.tabHoverProperties, this.tabActiveProperties, function(){
		Game.connectionManager.auth.speaker.accountData();
		// Always refresh account data
	}, function(){
		return Game.menus.main.afterAuth.tabComponent.component === Game.menus.account.overview;
	}), 0.22, 0.95, 0.32, 1);
	if(Game.connectionManager.auth.state.op){
		this.addComponent(new Gui.ActivatableTextComponent('Dev', this.tabProperties, this.tabHoverProperties, this.tabActiveProperties, function(){
			window.alert('Connect with the development server');
		}, function(){
			return Game.menus.main.afterAuth.tabComponent.component === Game.menus.dev.overview;
		}), 0.9, 0.95, 1, 1);
	}
	this.setActiveTab = function(menu){
		this.tabComponent.setComponent(menu);
	};
});