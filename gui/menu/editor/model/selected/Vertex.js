function ModelEditorSelectedVertex(editor, index){
	this.editor = editor;
	this.model = editor.builder;
	this.index = index;
	this.infoMenu = this.createInfoMenu();
}

ModelEditorSelectedVertex.prototype.move = function(dx, dy, dz){
	this.model.positions[this.index * 3] += dx;
	this.model.positions[this.index * 3 + 1] += dy;
	this.model.positions[this.index * 3 + 2] += dz;
};

ModelEditorSelectedVertex.prototype.onOpen = function(){
	this.editor.setRightComponent(this.infoMenu);
	this.infoMenu.afterSelectVertex();
};

ModelEditorSelectedVertex.prototype.textComponent1 = new Gui.TextComponent('Move the vertex horizontally with the arrow keys', TextProperties.label());
ModelEditorSelectedVertex.prototype.textComponent2 = new Gui.TextComponent('Move the vertex vertically with the up/down arrow key while holding shift', TextProperties.label());
ModelEditorSelectedVertex.prototype.textComponent3 = new Gui.TextComponent('Part:', TextProperties.label());

ModelEditorSelectedVertex.prototype.createInfoMenu = function(){
	const thisSelected = this;
	return new Gui.Menu('rgb(0,150,150)', function(){
		// TODO Improve layout and add more structure for this
		this.addComponent(thisSelected.textComponent1, 0, 0.86, 0.9, 0.9);
		this.addComponent(thisSelected.textComponent2, 0, 0.76, 1, 0.8);
		this.addComponent(thisSelected.textComponent3, 0.05, 0.6, 0.35, 0.65);

		// Add part combo box
		const modelParts = thisSelected.model.parts;
		const length = modelParts.length;
		const partNames = new Array(length);
		for (let index = 0; index < length; index++){
			const part = modelParts[index];
			partNames[index] = 'Part at (' + part.x + ',' + part.y + ',' + part.z + ') [' + index + ']';
		}
		this.addFullComponent(new Gui.ComboBox(partNames[thisSelected.model.matrices[thisSelected.index]], ModelEditorCombos.props, ModelEditorCombos.hoverProps, 0.08, 0.4, 0.9, 0.65, partNames, function(partName){
			const startIndex = partName.indexOf('[') + 1;
			const endIndex = partName.indexOf(']', startIndex);
			const index = parseInt(partName.substring(startIndex, endIndex));
			thisSelected.model.matrices[thisSelected.index] = index;
		}));

		// Add texture coordinates and link to texture edit
		this.addComponent(new Gui.TextComponent('Texture coordinates:', TextProperties.label()), 0.05, 0.4, 0.8, 0.45);
		this.addComponent(new Gui.TextComponent('x:', TextProperties.label()), 0.1, 0.35, 0.2, 0.4);
		this.addComponent(new Gui.TextComponent('y:', TextProperties.label()), 0.1, 0.3, 0.2, 0.35);

		this.textureX = new Gui.TextComponent('', TextProperties.variable());
		this.textureY = new Gui.TextComponent('', TextProperties.variable());
		this.addComponent(this.textureX, 0.25, 0.35, 0.4, 0.4);
		this.addComponent(this.textureY, 0.25, 0.3, 0.4, 0.35);
		this.addComponent(new Gui.TextComponent('Edit texture', ModelEditorToolbars.props, ModelEditorToolbars.hoverProps, function(x, y){
			thisSelected.editor.state.getManager().setMainComponent(thisSelected.editor.imageEditor);
			thisSelected.editor.imageEditor.setImage(thisSelected.editor.texture);
		}), 0.3, 0.2, 0.7, 0.3);

		// Functions to update content dynamically
		this.afterSelectVertex = function(){
			this.textureX.setText('' + thisSelected.model.textureCoords[thisSelected.index * 2]);
			this.textureY.setText('' + thisSelected.model.textureCoords[thisSelected.index * 2 + 1]);
		};
	});
};