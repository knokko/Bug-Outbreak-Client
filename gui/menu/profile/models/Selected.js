Game.menus.profile.models.selected = new Gui.Menu('rgb(0,150,250)', new function(){
	this.editButton = new Gui.TextComponent('Edit', TextProperties.button('rgb(0,200,0)', 'rgb(0,50,0)'), TextProperties.hoverButton('rgb(0,255,0)', 'rgb(0,80,0)'), function(){
		window.alert('Edit model ' + this.model.name);
	});
	this.viewButton = new Gui.TextComponent('View', TextProperties.button(), TextProperties.hoverButton(), function(){
		window.alert('View this model');
	});
	this.deleteButton = new Gui.TextComponent('Delete', TextProperties.button(), TextProperties.hoverButton(), function(){
		const model = Game.menus.profile.models.selected.model;
		if(model.isLocal){//model is stored in localStorage

		}
		else {//model is stored on the server

		}
	})
	this.setSelected = function(profileModel){
		this.model = profileModel;
		this.components = [];
	};
});