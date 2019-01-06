function ModelEditorSelectedVertex(editor, index){
	this.editor = editor;
	this.model = editor.builder;
	this.index = index;
}

ModelEditorSelectedVertex.prototype.move = function(dx, dy, dz){
	this.model.positions[this.index * 3] += dx;
	this.model.positions[this.index * 3 + 1] += dy;
	this.model.positions[this.index * 3 + 2] += dz;
};

ModelEditorSelectedVertex.prototype.onOpen = function(){
	this.editor.setRightComponent(this.infoMenu);
};

ModelEditorSelectedVertex.prototype.infoMenu = new Gui.Menu('rgb(0,150,150)', function(){
	// TODO Improve layout and add more structure for this
	this.addComponent(new Gui.TextComponent('Move the vertex horizontally with the arrow keys', TextProperties.label()), 0, 0.86, 0.9, 0.9);
	this.addComponent(new Gui.TextComponent('Move the vertex vertically with the up/down arrow key while holding shift', TextProperties.label()), 0, 0.76, 1, 0.8);
});