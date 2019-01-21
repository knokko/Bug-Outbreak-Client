ImageEditorToolbars.createFile = function(editor){
	let toolbar;
	if (editor.onSave){

		// The user is editing a plain image (add this later)
		toolbar = new Gui.Toolbar();
	} else {

		// The image is only a part of the editor
		toolbar = new Gui.Toolbar('File', editor.toolbarUpperProps, editor.toolbarUpperHoverProps, editor.toolbarUpperActiveProps, 0.05, 0.05, 0.25, 0.15, function(){
			this.addComponent(new Gui.TextComponent('Done', editor.toolbarProps, editor.toolbarHoverProps, function(){
				editor.onDone(editor.texture);
			}), 0.05);
			this.addComponent(new Gui.TextComponent('Save image as', editor.toolbarProps, editor.toolbarHoverProps, function(){
				window.alert('Save image as...');
			}), 0.05);
			this.addComponent(new Gui.BackgroundComponent(editor.toolbarProps.backgroundColor), 0.03);
			this.addComponent(new Gui.TextComponent('Replace with other image', editor.toolbarProps, editor.toolbarHoverProps, function(){
				window.alert('Replace with other image');
			}), 0.05);
			this.addComponent(new Gui.TextComponent('Discard changes', editor.toolbarProps, editor.toolbarHoverProps, function(){
				editor.onCancel();
			}), 0.05);
		});
	}
	return toolbar;
};