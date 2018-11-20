Game.menus.info.spectate = new Gui.Menu('rgb(0,150,120)', function(){
	this.addComponent(new Gui.TextComponent('Ok', TextProperties.button('rgb(0,150,0)', 'rgb(0,40,0)'), TextProperties.hoverButton('rgb(0,200,0)', 'rgb(0,60,0)'), function(x, y){
		this.state.getManager().setMainComponent(Game.menus.main.login);
	}), 0.45, 0.1, 0.55, 0.2);
});