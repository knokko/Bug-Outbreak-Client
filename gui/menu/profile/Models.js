Game.menus.profile.models.overview = new Gui.Menu('rgb(0,150,120)', function(){
	this.addComponent(new Gui.TextComponent('Character models', TextProperties.label()), 0.1, 0.83, 0.4, 0.98);
	this.addComponent(Game.menuComponents.profile.models.serverList, 0.05, 0.15, 0.3, 0.8);
	this.addComponent(Game.menuComponents.profile.models.localList, 0.325, 0.15, 0.575, 0.8);
	this.addComponent(Game.menuComponents.profile.models.selected, 0.6, 0.4, 0.95, 0.7);
	this.addComponent(new Gui.ConditionalTextComponent('Create new', TextProperties.button('rgb(0,0,200)', 'rgb(0,0,50)'), TextProperties.hoverButton('rgb(0,0,255)', 'rgb(0,0,80)'), function(){
		Game.guiManager.setMainComponent(new GuiModelEditor(undefined, new Gui3D.ModelBuilder(), undefined, function(){
			// Note that this refers to the editor and then to the saveAs menu
			this.setPopup(new Gui.Menu('rgb(100,0,150)', function(){
				let selectedSaveMode;
				const saveOnline = new Gui.ActivatableTextComponent('Save online', TextProperties.button('rgb(80,80,80)', 'rgb(30,30,70)'), TextProperties.hoverButton('rgb(100,100,200)', 'rgb(50,50,100)'), TextProperties.hoverButton('200,100,255', 'rgb(200,100,50)'), function(){
					selectedSaveMode = this;
				}, function(){
					return selectedSaveMode === this;
				});
				selectedSaveMode = saveOnline;
				this.addComponent(saveOnline, 0.6, 0.7, 0.8, 0.8);
				this.addComponent(new Gui.ActivatableTextComponent('Save offline', TextProperties.button('rgb(80,80,80)', 'rgb(30,30,70)'), TextProperties.hoverButton('rgb(100,100,200)', 'rgb(50,50,100)'), TextProperties.hoverButton('200,100,255', 'rgb(200,100,50)'), function(){
					selectedSaveMode = this;
				}, function(){
					return selectedSaveMode === this;
				}), 0.6, 0.5, 0.8, 0.6);
				this.addComponent(new Gui.TextComponent('Name: ', TextProperties.label()), 0.1, 0.4, 0.2, 0.475);
				this.addComponent(new Gui.TextInputComponent('', 25, TextProperties.edit(), TextProperties.focusEdit()), 0.1, 0.3, 0.4, 0.4);
				this.addComponent(new Gui.TextComponent('Save', TextProperties.button('rgb(0,200,0)', 'rgb(0,50,0)'), TextProperties.hoverButton('rgb(0,255,0)', 'rgb(0,65,0)'), function(){
					if (selectedSaveMode === saveOnline){
						window.alert('Save online');
					} else {
						window.alert('Save offline');
					}
				}), 0.2, 0.1, 0.3, 0.2);
			}));
		}, function(){
			Game.guiManager.setMainComponent(Game.menus.main.afterAuth);
			Game.menuComponents.profile.models.localList.refresh();
			Game.menuComponents.profile.models.serverList.refresh();
			Game.menus.profile.models.overview.setSelected(null);
		}));
	}, function(){
		return Game.profile.serverModelNames.length < Game.profile.maxModelSlots;
	}), 0.1, 0.025, 0.3, 0.125);
	this.setSelected = function(model){
		Game.menuComponents.profile.models.selected.setSelected(model);
		this.state.getManager().markDirty();
	};
});