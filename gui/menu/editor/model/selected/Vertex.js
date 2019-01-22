function ModelEditorSelectedVertex(editor){
	this.editor = editor;
	this.index = -1;
	this.infoMenu = this.createInfoMenu();
}

ModelEditorSelectedVertex.prototype.move = function(dx, dy, dz){
	this.model.positions[this.index * 3] += dx;
	this.model.positions[this.index * 3 + 1] += dy;
	this.model.positions[this.index * 3 + 2] += dz;
	this.infoMenu.afterVertexMove();
};

ModelEditorSelectedVertex.prototype.onOpen = function(){
	this.model = this.editor.builder;
	this.editor.setRightComponent(this.infoMenu);
	this.infoMenu.afterSelectVertex();
};

ModelEditorSelectedVertex.prototype.createInfoMenu = function(){
	const thisSelected = this;
	return new Gui.Menu('rgb(0,150,150)', function(){

		// TODO Improve layout
		this.addComponent(new Gui.TextComponent('Move the vertex horizontally with the arrow keys', TextProperties.label()), 0, 0.86, 0.9, 0.9);
		this.addComponent(new Gui.TextComponent('Move the vertex vertically with the up/down arrow key while holding shift', TextProperties.label()), 0, 0.8, 1, 0.84);
		this.addComponent(new Gui.TextComponent('Part:', TextProperties.label()), 0.05, 0.74, 0.35, 0.78);

		// Vertex position
		this.addComponent(new Gui.TextComponent('Position (relative):', TextProperties.label()), 0.05, 0.6, 0.4, 0.64);
		this.addComponent(new Gui.TextComponent('x:', TextProperties.label()), 0.1, 0.54, 0.2, 0.58);
		this.addComponent(new Gui.TextComponent('y:', TextProperties.label()), 0.1, 0.48, 0.2, 0.52);
		this.addComponent(new Gui.TextComponent('z:', TextProperties.label()), 0.1, 0.42, 0.2, 0.46);
		this.positionX = new Gui.DynamicTextComponent('', TextProperties.variable());
		this.positionY = new Gui.DynamicTextComponent('', TextProperties.variable());
		this.positionZ = new Gui.DynamicTextComponent('', TextProperties.variable());
		this.addComponent(this.positionX, 0.25, 0.54, 0.4, 0.58);
		this.addComponent(this.positionY, 0.25, 0.48, 0.4, 0.52);
		this.addComponent(this.positionZ, 0.25, 0.42, 0.4, 0.46);

		// Add texture coordinates and link to texture edit
		this.addComponent(new Gui.TextComponent('Texture coordinates:', TextProperties.label()), 0.05, 0.36, 0.8, 0.4);
		this.addComponent(new Gui.TextComponent('x:', TextProperties.label()), 0.1, 0.3, 0.2, 0.34);
		this.addComponent(new Gui.TextComponent('y:', TextProperties.label()), 0.1, 0.24, 0.2, 0.28);

		this.textureX = new Gui.DynamicTextComponent('', TextProperties.variable());
		this.textureY = new Gui.DynamicTextComponent('', TextProperties.variable());
		this.addComponent(this.textureX, 0.25, 0.3, 0.4, 0.34);
		this.addComponent(this.textureY, 0.25, 0.24, 0.4, 0.28);
		this.addComponent(new Gui.TextComponent('Edit texture', ModelEditorToolbars.props, ModelEditorToolbars.hoverProps, function(x, y){
			thisSelected.editor.state.getManager().setMainComponent(thisSelected.editor.imageEditor);
			thisSelected.editor.imageEditor.setImage(thisSelected.editor.texture);
		}), 0.3, 0.1, 0.7, 0.2);

		// Functions to update content dynamically
		this.afterSelectVertex = function(){
			this.textureX.setText('' + thisSelected.model.textureCoords[thisSelected.index * 2]);
			this.textureY.setText('' + thisSelected.model.textureCoords[thisSelected.index * 2 + 1]);
			this.afterVertexMove();
			this.afterPartEdit();
		};
		this.afterVertexMove = function(){
			this.positionX.setText('' + thisSelected.model.positions[thisSelected.index * 3]);
			this.positionY.setText('' + thisSelected.model.positions[thisSelected.index * 3 + 1]);
			this.positionZ.setText('' + thisSelected.model.positions[thisSelected.index * 3 + 2]);
		};
		this.afterPartEdit = function(){
			// Add part combo box
			const modelParts = thisSelected.model.parts;
			const length = modelParts.length;
			const partNames = new Array(length);
			for (let index = 0; index < length; index++){
				const part = modelParts[index];
				partNames[index] = 'Part at (' + part.x + ',' + part.y + ',' + part.z + ') [' + index + ']';
			}
			const partSelectComponent = new Gui.ComboBox(partNames[thisSelected.model.matrices[thisSelected.index]], ModelEditorCombos.props, ModelEditorCombos.hoverProps, 0.08, 0.53, 0.9, 0.78, partNames, function(partName){
				const startIndex = partName.indexOf('[') + 1;
				const endIndex = partName.indexOf(']', startIndex);
				const index = parseInt(partName.substring(startIndex, endIndex));
				thisSelected.model.matrices[thisSelected.index] = index;
			});
			if (this.partSelect === undefined){
				this.partSelect = this.addFullComponent(partSelectComponent);
			} else {
				this.partSelect.setComponent(partSelectComponent);
			}
		};
	});
};