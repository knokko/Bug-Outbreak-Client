Game.menus.profile.models.overview = new Gui.Menu('rgb(0,150,120)', function(){
	this.addComponent(new Gui.TextComponent('Character models', TextProperties.label()), 0.1, 0.83, 0.4, 0.98);
	this.addComponent(Game.menuComponents.profile.models.serverList, 0.05, 0.15, 0.3, 0.8);
	this.addComponent(Game.menuComponents.profile.models.localList, 0.325, 0.15, 0.575, 0.8);
	this.addComponent(Game.menuComponents.profile.models.selected, 0.6, 0.4, 0.95, 0.7);
	this.addComponent(new Gui.ConditionalTextComponent('Create new', TextProperties.button('rgb(0,0,200)', 'rgb(0,0,50)'), TextProperties.hoverButton('rgb(0,0,255)', 'rgb(0,0,80)'), function(){
		const saveOnline = function(){
			// this will refer to the editor
			window.alert('Save online');
		};
		const saveOffline = function(){
			// this will refer to the editor
			const output = createLocalStorageOutput('profileEntityModel_' + this.name);
			//Game.models.saveModelBuilder(this.builder, output);
			const timeString = new Date().toString();
			if (!this.createdAt){
				this.createdAt = timeString;
			}
			saveProfileEntityModel(new ProfileEntityModel(this.builder, this.name, this.createdAt, timeString), output);
			output.terminate();
			Game.profile.localModelNames.push(this.name);
			saveLocalProfileEntityModels();
		};
		Game.guiManager.setMainComponent(new GuiModelEditor(undefined, new Gui3D.ModelBuilder(), undefined, function(){

			const thisEditor = this;

			// Note that this refers to the editor and then to the saveAs menu
			this.setPopup(new Gui.Menu('rgb(100,0,150)', function(){
				const thisPopup = this;
				let selectedSaveMode;
				const saveOnline = new Gui.ActivatableTextComponent('Save online', TextProperties.button('rgb(80,80,80)', 'rgb(30,30,70)'), TextProperties.hoverButton('rgb(100,100,200)', 'rgb(50,50,100)'), TextProperties.hoverButton('200,100,255', 'rgb(200,100,50)'), function(){
					selectedSaveMode = this;
				}, function(){
					return selectedSaveMode === this;
				});
				selectedSaveMode = saveOnline;
				this.addComponent(saveOnline, 0.6, 0.7, 0.8, 0.8);
				this.addComponent(new Gui.ActivatableTextComponent('Save offline', TextProperties.button('rgb(80,80,80)', 'rgb(30,30,70)'), TextProperties.hoverButton('rgb(100,100,200)', 'rgb(50,50,100)'), TextProperties.hoverButton('200,100,255', 'rgb(200,100,50)'), function(){
					if (canUseLocalStorage){
						selectedSaveMode = this;
					} else {
						window.alert('Offline saving is not supported by your browser.');
					}
				}, function(){
					return selectedSaveMode === this;
				}), 0.6, 0.5, 0.8, 0.6);
				const nameInput = new Gui.TextInputComponent('', 25, TextProperties.edit(), TextProperties.focusEdit());
				this.addComponent(new Gui.TextComponent('Name: ', TextProperties.label()), 0.1, 0.4, 0.2, 0.475);
				this.addComponent(nameInput, 0.1, 0.3, 0.4, 0.4);
				this.addComponent(new Gui.TextComponent('Save', TextProperties.button('rgb(0,200,0)', 'rgb(0,50,0)'), TextProperties.hoverButton('rgb(0,255,0)', 'rgb(0,65,0)'), function(){
					thisEditor.name = nameInput.text;
					if (selectedSaveMode === saveOnline){
						thisEditor.save = saveOnline;
					} else {
						thisEditor.save = saveOffline;
					}
					thisEditor.save();
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