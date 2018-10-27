ModelEditorToolbars.createAdd = function(editor){
	const t = ModelEditorToolbars;
	const toolbar = new Gui.Toolbar('Add', t.upperProps, t.upperHoverProps, t.upperActiveProps, 0.05, 0.15, 0.35, 0.25, function(){
		this.addComponent(new Gui.TextComponent('Vertex', t.props, t.hoverProps, function(x, y, button){
			editor.builder.addVertex();//TODO coords
			editor.setViewMode(ModelViewMode.ABSTRACT);
		}));
	});
};