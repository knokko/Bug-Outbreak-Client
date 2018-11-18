ModelEditorToolbars.createFile = function(editor){
	const t = ModelEditorToolbars;
	const toolbar = new Gui.Toolbar('File', t.upperProps, t.upperHoverProps, t.upperActiveProps, 0.05, 0.05, 0.25, 0.15, function(){
		this.addComponent(new Gui.TextComponent('Save', t.props, t.hoverProps, function(x, y, button){
			if (editor.name) {
				editor.save();
				editor.hasChanges = false;
			} else {
				editor.saveAs();
			}
		}), 0.05);
		this.addComponent(new Gui.TextComponent('Save as', t.props, t.hoverProps, function(x, y, button){
			editor.saveAs();
		}), 0.05);
		this.addComponent(new Gui.TextComponent('Exit', t.props, t.hoverProps, function(x, y, button){
			if (editor.hasChanges){
				const popup = new Gui.Menu(ModelEditorPopups.backgroundColor, function(){
					this.addComponent(new Gui.TextComponent('Would you like to save?', ModelEditorPopups.labelProps), 0.2, 0.6, 0.8, 0.8);
					this.addComponent(new Gui.TextComponent('Yes', ModelEditorPopups.buttonProps, ModelEditorPopups.buttonHoverProps, function(x, y, button){
						editor.save();
						editor.exit();
					}), 0.1, 0.2, 0.3, 0.4);
					this.addComponent(new Gui.TextComponent('No', ModelEditorPopups.buttonProps, ModelEditorPopups.buttonHoverProps, function(x, y, button){
						editor.exit();
					}), 0.35, 0.2, 0.55, 0.4);
					this.addComponent(new Gui.TextComponent('Cancel', ModelEditorPopups.buttonProps, ModelEditorPopups.buttonHoverProps, function(x, y, button){
						editor.setPopup(null);
					}), 0.6, 0.2, 0.85, 0.4);
				});
				editor.setPopup(popup);
			} else {
				editor.exit();
			}
		}), 0.05);
	});
	return toolbar;
};