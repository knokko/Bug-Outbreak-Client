Game.menus.realm.select.list = new Gui.Menu('rgb(0,150,120)', function(){
	this.realmProps = TextProperties.listElement('rgb(200,200,255)', '50,50,255');
	this.realmHoverProps = TextProperties.listElement('rgb(100,100,255)', 'rgb(0,0,255)');
	this.setSelected = function(realmName){
		if(this.selected){
			this.selected.setProps(this.realmProps);
			this.selected.setHoverProps(this.realmHoverProps);
		}
		for(let index = 0; index < this.components.length; index++){
			if(this.components[index].component.text === realmName){
				this.selected = this.components[index].component;
				this.selected.setProps(this.realmSelectedProps);
				this.selected.setHoverProps(this.realmSelectedProps);
				break;
			}
		}
	};
	this.refresh = function(){
		this.components = [];
		if(Game.realms.length > 0){
			for(let index = 0; index < Game.realms.length; index++){
				this.addComponent(new Gui.TextComponent(Game.realms[index], realmProps, realmHoverProps, function(){
					Game.connectionManager.auth.speaker.realmInfo(this.text);
				}, 512, 128), 0, 0.95 - index * 0.1, 1, 1 - index * 0.1);
			}
		}
		else {
			this.addComponent(new Gui.TextComponent('There are no available realms at the moment', TextProperties.label()), 0, 0.95, 1, 1);
		}
	};
});