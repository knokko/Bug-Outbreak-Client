Game.menus.main.register = new Gui.Menu('rgb(0,150,120)', function(){
	this.username = new Gui.TextInputComponent('', MAX_USERNAME_LENGTH, TextProperties.edit(), TextProperties.focusEdit());
	this.password = new Gui.PasswordInputComponent(50, TextProperties.edit(), TextProperties.focusEdit());
	this.registerError = new Gui.TextComponent('', TextProperties.label('rgb(255,0,0'));
	this.repeatPassword = new Gui.PasswordInputComponent(50, TextProperties.edit(), TextProperties.focusEdit());
	this.addComponent(this.registerError, 0.2, 0.9, 0.8, 0.98);
	this.addComponent(new Gui.TextComponent('Username', TextProperties.label()), 0.3, 0.825, 0.4, 0.875);
	this.addComponent(this.username, 0.3, 0.7, 0.5, 0.8);
	this.addComponent(new Gui.TextComponent('Password', TextProperties.label()), 0.3, 0.6, 0.4, 0.65);
	this.addComponent(this.password, 0.3, 0.475, 0.5, 0.575);
	this.addComponent(new Gui.TextComponent('Repeat password', TextProperties.label()), 0.3, 0.375, 0.5, 0.425);
	this.addComponent(this.repeatPassword, 0.3, 0.25, 0.5, 0.35);
	this.addComponent(new Gui.TextComponent('Cancel', TextProperties.button('rgb(200,0,0', 'rgb(50,0,0)'), TextProperties.button('rgb(255,0,0)', 'rgb(80,0,0)'),function(){
		Game.guiManager.setMainComponent(Game.menus.main.login);
	}), 0.05, 0.8, 0.2, 0.9);
	this.addComponent(new Gui.TextComponent('Create account', TextProperties.button('rgb(0,200,0)', 'rgb(0,50,0)'), TextProperties.button('rgb(0,255,0)', 'rgb(0,80,0)'), function(){
		const menu = Game.menus.main.register;
		if(menu.password.text === menu.repeatPassword.text){
			Game.connectionManager.auth.speaker.register(menu.username.text, menu.password.text);
			menu.setRegisterError('');

			// Clear the password later
		}
		else {
			menu.setRegisterError('The password is not equal to the repeat password');
		}
	}), 0.3, 0.05, 0.5, 0.15);
	this.addComponent(new Gui.TextComponent('Restrictions:', TextProperties.label()), 0.6, 0.6, 0.7, 0.65);
	this.addComponent(new Gui.TextComponent('Every account must have another usename', TextProperties.label()), 0.625, 0.525, 0.9, 0.575);
	this.addComponent(new Gui.TextComponent('Only 10 accounts can be created at every IP-address', TextProperties.label()), 0.625, 0.45, 0.975, 0.5);
	this.setRegisterError = function(error){
		this.registerError.setText(error);
	};
});