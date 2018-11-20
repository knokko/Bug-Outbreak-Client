ModelEditorToolbars.createSelect = function(editor){
	const t = ModelEditorToolbars;
	const toolbar = new Gui.Toolbar('Select', t.upperProps, t.upperHoverProps, t.upperActiveProps, 0.05, 0.35, 0.55, 0.5, function(){
		this.addComponent(new Gui.TextComponent('Vertex', t.props, t.hoverProps, function(x, y){
			window.alert('Let user select vertex...');
		}), 0.05);
	});
	return toolbar;
};