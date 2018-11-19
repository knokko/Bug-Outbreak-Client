ModelEditorToolbars.createAdd = function(editor){
	const t = ModelEditorToolbars;
	const toolbar = new Gui.Toolbar('Add', t.upperProps, t.upperHoverProps, t.upperActiveProps, 0.05, 0.15, 0.35, 0.25, function(){
		this.addComponent(new Gui.TextComponent('Vertex', t.props, t.hoverProps, function(x, y, button){
			const cam = editor.camera;
			const look = cam.getForwardVector();
			editor.selected = new ModelEditorSelectedVertex(editor.builder, editor.builder.addVertex(cam.getX() + look.x, cam.getY() + look.y, cam.getZ() + look.z, 0, 0, 0));
			editor.setViewMode(ModelViewMode.ABSTRACT);
			editor.hasChanges = true;
		}), 0.05);
	});
	return toolbar;
};