ModelEditorToolbars.createBind = function(editor){
	const t = ModelEditorToolbars;
	const toolbar = new Gui.Toolbar('Bind', t.upperProps, t.upperHoverProps, t.upperActiveProps, 0.05, 0.25, 0.45, 0.35, function(){
		this.addComponent(new Gui.TextComponent('Triangle', t.props, t.hoverProps, function(x, y){
			window.alert('Bind a triangle...');
		}), 0.05);
	});
	return toolbar;
};