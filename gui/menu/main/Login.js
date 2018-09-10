Game.menus.main.login = new Gui.Menu('rgb(0,150,120)', function(){
	this.username = new Gui.TextInputComponent('', MAX_USERNAME_LENGTH, TextProperties.edit(), TextProperties.focusEdit());
	this.password = new Gui.PasswordInputComponent(50, TextProperties.edit(), TextProperties.focusEdit());
	this.loginError = new Gui.TextComponent('', TextProperties.label('rgb(255,0,0)'));
	this.addComponent(this.loginError, 0.2, 0.9, 0.8, 0.98);
	this.addComponent(new Gui.TextComponent('Username', TextProperties.label()), 0.2, 0.75, 0.3, 0.8);
	this.addComponent(this.username, 0.2, 0.625, 0.4, 0.725);
	this.addComponent(new Gui.TextComponent('Password', TextProperties.label()), 0.2, 0.525, 0.3, 0.575);
	this.addComponent(this.password, 0.2, 0.4, 0.4, 0.5);
	this.addComponent(new Gui.TextComponent('Log in', TextProperties.button('rgb(0,200,0)', 'rgb(0,70,0)'), TextProperties.hoverButton('rgb(0,255,0)', 'rgb(0,120,0)'), function(){
		const menu = Game.menus.main.login;
		menu.setLoginError('');
		Game.connectionManager.auth.speaker.login1(menu.username.text, menu.password.text);
		menu.password.setText('');
	}), 0.2, 0.175, 0.4, 0.275);
	this.addComponent(new Gui.TextComponent('No account yet?', TextProperties.label()), 0.6, 0.825, 0.75, 0.875);
	this.addComponent(new Gui.TextComponent('Create Account', TextProperties.button('rgb(0,200,0)', 'rgb(0,70,0)'), TextProperties.hoverButton('rgb(0,255,0)', 'rgb(0,120,0)'), function(){
		Game.guiManager.setMainComponent(Game.menus.main.register);
	}), 0.6, 0.7, 0.8, 0.8);
	this.addComponent(new Gui.TextComponent("Don't want to create an account?", TextProperties.label()), 0.6, 0.55, 0.85, 0.6);
	this.addComponent(new Gui.TextComponent('Play as guest', TextProperties.button('rgb(200,100,0)', 'rgb(50,25,0)'), TextProperties.hoverButton('rgb(255,150,0)', 'rgb(100,50,0)'), function(){
	}), 0.6, 0.4, 0.8, 0.5);
	this.addComponent(new Gui.TextComponent('?', TextProperties.button('rgb(200,100,0)', 'rgb(50,25,0)'), TextProperties.hoverButton('rgb(255,150,0)', 'rgb(100,50,0)'), function(){
		Game.guiManager.setMainComponent(Game.menus.info.playGuest);
	}), 0.815, 0.42, 0.845, 0.48);
	this.addComponent(new Gui.TextComponent('Spectate', TextProperties.button('rgb(150,0,200)', 'rgb(50,0,70)'), TextProperties.button('rgb(210,0,255)', 'rgb(70,0,100)'), function(){
	}), 0.6, 0.25, 0.8, 0.35);
	this.addComponent(new Gui.TextComponent('?', TextProperties.button('rgb(150,0,200)', 'rgb(50,0,70)'), TextProperties.button('rgb(210,0,255)', 'rgb(70,0,100)'), function(){
		Game.guiManager.setMainComponent(Game.menus.info.spectate);
	}), 0.815, 0.27, 0.845, 0.33);
	this.setLoginError = function(error){
		this.loginError.setText(error);
	};
});