function ModelEditorModelComponent(editor){
	this.editor = editor;
	this.pressedKeys = {};
	this.prevMouseX = NaN;
	this.prevMouseY = NaN;
}

ModelEditorModelComponent.prototype.render = function(renderer){
	this.editor.viewMode.render(renderer, this.editor.builder, this.editor.camera.getMatrix(), this.editor);
};

ModelEditorModelComponent.prototype.update = function(){
	const k = this.pressedKeys;
	const cameraSpeed = 3;
	const objectSpeed = 3;
	if (k['p']) {
		console.log('camera', this.editor.camera);
	}
	if (k['a']) {
		const right = this.editor.camera.getRightVector();
		this.editor.camera.increasePosition(-right.x * cameraSpeed, -right.y * cameraSpeed, -right.z * cameraSpeed);
		this.state.getManager().markDirty();
	}
	if (k['d']) {
		const right = this.editor.camera.getRightVector();
		this.editor.camera.increasePosition(right.x * cameraSpeed, right.y * cameraSpeed, right.z * cameraSpeed);
		this.state.getManager().markDirty();
	}
	if (k['s']) {
		const forward = this.editor.camera.getForwardVector();
		this.editor.camera.increasePosition(-forward.x * cameraSpeed, -forward.y * cameraSpeed, -forward.z * cameraSpeed);
		this.state.getManager().markDirty();
	}
	if (k['S']){
		const up = this.editor.camera.getUpVector();
		this.editor.camera.increasePosition(-up.x * cameraSpeed, -up.y * cameraSpeed, -up.z * cameraSpeed);
		this.state.getManager().markDirty();
	}
	if (k['w']) {
		const forward = this.editor.camera.getForwardVector();
		this.editor.camera.increasePosition(forward.x * cameraSpeed, forward.y * cameraSpeed, forward.z * cameraSpeed);
		this.state.getManager().markDirty();
	}
	if (k['W']){
		const up = this.editor.camera.getUpVector();
		this.editor.camera.increasePosition(up.x * cameraSpeed, up.y * cameraSpeed, up.z * cameraSpeed);
		this.state.getManager().markDirty();
	}
	if (this.state.getManager().mouseDown){
		const newMouseX = this.state.getMouseX();
		const newMouseY = this.state.getMouseY();
		if (this.prevMouseX === this.prevMouseX && this.prevMouseY === this.prevMouseY && newMouseX === newMouseX && newMouseY === newMouseY){
			const dx = newMouseX - this.prevMouseX;
			const dy = newMouseY - this.prevMouseY;
			if (dx) {
				this.editor.camera.increaseYaw(dx * 100);
			}
			if (dy) {
				this.editor.camera.increasePitch(-dy * 100);
			}
			if (dx || dy) {
				this.state.getManager().markDirty();
			}
		}
		this.prevMouseX = newMouseX;
		this.prevMouseY = newMouseY;
	} else {
		this.prevMouseX = NaN;
		this.prevMouseY = NaN;
	}
	if (this.editor.selected) {
		if (k['ArrowLeft']) {
			const right = this.editor.camera.getRightVector();
			this.editor.selected.move(Math.round(-objectSpeed * right.x), Math.round(-objectSpeed * right.y), Math.round(-objectSpeed * right.z));
			this.editor.hasChanges = true;
			this.state.getManager().markDirty();
		}
		if (k['ArrowRight']) {
			const right = this.editor.camera.getRightVector();
			this.editor.selected.move(Math.round(objectSpeed * right.x), Math.round(objectSpeed * right.y), Math.round(objectSpeed * right.z));
			this.editor.hasChanges = true;
			this.state.getManager().markDirty();
		}
		if (k['ArrowUp']) {
			if (k['Shift']){
				const up = this.editor.camera.getUpVector();
				this.editor.selected.move(Math.round(objectSpeed * up.x), Math.round(objectSpeed * up.y), Math.round(objectSpeed * up.z));
			}
			else {
				const forward = this.editor.camera.getForwardVector();
				this.editor.selected.move(Math.round(objectSpeed * forward.x), Math.round(objectSpeed * forward.y), Math.round(objectSpeed * forward.z));
			}
			this.editor.hasChanges = true;
			this.state.getManager().markDirty();
		}
		if (k['ArrowDown']) {
			if (k['Shift']){
				const up = this.editor.camera.getUpVector();
				this.editor.selected.move(Math.round(-objectSpeed * up.x), Math.round(-objectSpeed * up.y), Math.round(-objectSpeed * up.z));
			}
			else {
				const forward = this.editor.camera.getForwardVector();
				this.editor.selected.move(Math.round(-objectSpeed * forward.x), Math.round(-objectSpeed * forward.y), Math.round(-objectSpeed * forward.z));
			}
			this.editor.hasChanges = true;
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

ModelEditorModelComponent.prototype.click = function(x, y){
	this.editor.selectMode.click(x, y);
};