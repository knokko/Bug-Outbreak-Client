Game.menus.realm.select.overview = new Gui.Menu('rgb(0,150,120)', function(){
	this.addComponent(new Gui.TextComponent('Realms', TextProperties.label()), 0.1, 0.8, 0.35, 0.95);
	this.addComponent(Game.menus.realm.select.list, 0.1, 0.05, 0.45, 0.7);
	this.addComponent(Game.menus.realm.select.selected, 0.6, 0.2, 0.95, 0.7);
	this.setSelected = function(realm){
		Game.menus.realm.list.setSelected(realm);
		Game.menus.realm.selected.setSelected(realm);
	};
});