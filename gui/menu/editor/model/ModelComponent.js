function ModelEditorModelComponent(editor){
	this.editor = editor;
	this.pressedKeys = {};
}

ModelEditorModelComponent.prototype.render = function(renderer){
	this.editor.viewMode.render(renderer, this.editor.builder, this.editor.camera.getMatrix());
};

ModelEditorModelComponent.prototype.update = function(){
	const k = this.pressedKeys;
	const cameraSpeed = 0.01;
	const objectSpeed = 0.01;
	if (k['a']) {
		this.editor.camera.increaseX(-cameraSpeed);
		this.state.getManager().markDirty();
	}
	if (k['d']) {
		this.editor.camera.increaseX(cameraSpeed);
		this.state.getManager().markDirty();
	}
	if (k['s']) {
		if (k['shift'])
			this.editor.camera.increaseY(-cameraSpeed);
		else
			this.editor.camera.increaseZ(cameraSpeed);
		this.state.getManager().markDirty();
	}
	if (k['w']) {
		if (k['shift'])
			this.editor.camera.increaseY(cameraSpeed);
		else
			this.editor.camera.increaseZ(-cameraSpeed);
		this.state.getManager().markDirty();
	}
	if (this.editor.selected) {
		if (k['ArrowLeft']) {
			this.editor.selected.move(-objectSpeed, 0);
			this.state.getManager().markDirty();
		}
		if (k['ArrowRight']) {
			this.editor.selected.move(objectSpeed, 0);
			this.state.getManager().markDirty();
		}
		if (k['ArrowUp']) {
			if (k['shift'])
				this.editor.selected.move(0, objectSpeed, 0);
			else
				this.editor.selected.move(0, 0, -objectSpeed);
			this.state.getManager().markDirty();
		}
		if (k['ArrowDown']) {
			if (k['shift'])
				this.editor.selected.move(0, -objectSpeed, 0);
			else
				this.editor.selected.move(0, 0, objectSpeed);
			this.state.getManager().markDirty();
		}
	}
};

ModelEditorModelComponent.prototype.keyDown = function(key){
	this.pressedKeys[key] = true;
};

ModelEditorModelComponent.prototype.keyUp = function(key){
	this.pressedKeys[key] = false;
};