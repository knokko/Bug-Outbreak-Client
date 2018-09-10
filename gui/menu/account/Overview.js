Game.menus.account.overview = new Gui.Menu('rgb(0,150,120)', function(){
	this.addComponent(new Gui.TextComponent('Account', TextProperties.label()), 0.15, 0.75, 0.4, 0.95);
	this.addComponent(new Gui.TextComponent('ID', TextProperties.label()), 0.15, 0.55, 0.2, 0.65);
	this.addComponent(new Gui.TextComponent('Username', TextProperties.label()), 0.15, 0.4, 0.35, 0.5);
	this.addComponent(new Gui.TextComponent('Created at', TextProperties.label()), 0.15, 0.25, 0.35, 0.35);

	this.addComponent(new Gui.TextComponent(Game.account.id, TextProperties.label(), undefined, undefined, 600, 100), 0.4, 0.55, 0.70, 0.65);
	this.addComponent(new Gui.TextComponent(Game.account.username, TextProperties.label(), undefined, undefined, 600, 100), 0.4, 0.4, 0.70, 0.5);
	this.addComponent(new Gui.TextComponent(Game.account.creationAddress, TextProperties.label(), undefined, undefined, 600, 100), 0.4, 0.25, 0.70, 0.35);
});