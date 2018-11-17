Game.menuComponents.profile.models.selected = new Gui.Menu('rgb(0,150,250)', function(){
	this.editButton = new Gui.TextComponent('Edit', TextProperties.button('rgb(0,200,0)', 'rgb(0,50,0)'), TextProperties.hoverButton('rgb(0,255,0)', 'rgb(0,80,0)'), function(){
		window.alert('Edit model ' + this.model.name);
	});
	this.viewButton = new Gui.TextComponent('View', TextProperties.button(), TextProperties.hoverButton(), function(){
		window.alert('View this model');
	});
	this.deleteButton = new Gui.TextComponent('Delete', TextProperties.button(), TextProperties.hoverButton(), function(){
		const model = Game.menus.profile.models.selected.model;
		if(model.isLocal){//model is stored in localStorage
			window.alert('Delete this local model');
		}
		else {//model is stored on the server
			window.alert('Delete this server model');
		}
	})
	this.setSelected = function(profileModel){
		this.model = profileModel;
		this.components = [];
		if (profileModel) {
			this.addComponent(this.editButton, 0.2, 0.65, 0.8, 0.8);
			this.addComponent(this.viewButton, 0.2, 0.5, 0.8, 0.6);
			this.addComponent(this.deleteButton, 0.2, 0.2, 0.8, 0.3);
			this.addComponent(new Gui.TextComponent(this.model.name, TextProperties.label()), 0.05, 0.85, 0.95, 0.95);
		}
	};
});