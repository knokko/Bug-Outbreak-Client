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
	const guestInfo = new Gui.TextComponent('?', TextProperties.button('rgb(200,100,0)', 'rgb(50,25,0)'));
	this.addComponent(guestInfo, 0.815, 0.42, 0.845, 0.48);
	this.addComponent(new Gui.TextComponent('Spectate', TextProperties.button('rgb(150,0,200)', 'rgb(50,0,70)'), TextProperties.button('rgb(210,0,255)', 'rgb(70,0,100)'), function(){
	}), 0.6, 0.25, 0.8, 0.35);
	const spectateInfo = new Gui.TextComponent('?', TextProperties.button('rgb(150,0,200)', 'rgb(50,0,70)'));
	this.addComponent(spectateInfo, 0.815, 0.27, 0.845, 0.33);
	this.addComponent(new Gui.ConditionalTextAreaComponent("Spectating is watching what happens in the game world without playing yourself, "
	+ "you don't even need to log in.", TextProperties.area('rgb(0,0,0)', 'rgb(150,0,200)', 'rgb(50,0,70)', '20px sans-serif'), undefined, undefined, function(){
		return spectateInfo.state.isMouseOver();
	}, 300, 100), 0.81, 0.17, 0.98, 0.28);
	this.addComponent(new Gui.ConditionalTextAreaComponent("Every world has some characters that are not owned by players, but are on their side."
		+ "When you play as guest, you can play one of those characters. You don't even need your account for this, but this also means that "
		+ "the character you play might not be always available and that you can not customize that character.", 
		TextProperties.area('rgb(0,0,0)', 'rgb(200,100,0)', 'rgb(50,25,0)', '20px sans-serif'), undefined, undefined, function(){
		return guestInfo.state.isMouseOver();
	}, 300, 300), 0.79, 0.16, 0.99, 0.45);
	this.setLoginError = function(error){
		this.loginError.setText(error);
	};
});