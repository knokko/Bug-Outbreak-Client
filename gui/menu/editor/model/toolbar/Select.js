ModelEditorToolbars.createSelect = function(editor){
	const t = ModelEditorToolbars;
	const toolbar = new Gui.Toolbar('Select', t.upperProps, t.upperHoverProps, t.upperActiveProps, 0.05, 0.35, 0.55, 0.5, function(){
		this.addComponent(new Gui.TextComponent('Triangle', t.props, t.hoverProps, function(x, y){
			/*
			editor.setSelectMode(new ModelEditorSelectModes.Vertex(editor, function(index){
				editor.setSelected(new ModelEditorSelectedVertex(editor, index));
				editor.setSelectMode(null);
			}, function(){
				editor.setSelectMode(null);
			}));
			*/
		}), 0.05);
	});
	return toolbar;
};