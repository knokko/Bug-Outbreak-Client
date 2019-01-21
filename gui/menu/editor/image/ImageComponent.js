function ImageEditorImageComponent(editor){

	// Create some space around the image
	this.minCameraX = -10;
	this.minCameraY = -10;
	this.maxCameraX = editor.texture.width + 10;
	this.maxCameraY = editor.texture.height + 10;

	this.editor = editor;

	this.pressedKeys = {};
	this.cameraSpeed = 0.1;
	this.scrollSpeed = 0.1;
}

ImageEditorImageComponent.prototype.render = function(renderer){
	renderer.clear('black');
	const minCameraX = this.minCameraX;
	const minCameraY = this.minCameraY;
	const maxCameraX = this.maxCameraX;
	const maxCameraY = this.maxCameraY;
	const textureWidth = this.editor.texture.width;
	const textureHeight = this.editor.texture.height;
	const cameraWidth = this.maxCameraX - this.minCameraX;
	const cameraHeight = this.maxCameraY - this.minCameraY;
	if (minCameraX < textureWidth && minCameraY < textureHeight && maxCameraX >= 0 && maxCameraY >= 0){
		const inMinX = minCameraX >= 0;
		const inMinY = minCameraY >= 0;
		const inMaxX = maxCameraX <= textureWidth;
		const inMaxY = maxCameraY <= textureHeight;
		const minScreenX = inMinX ? 0 : -minCameraX / cameraWidth;
		const maxScreenY = inMinY ? 1 : 1 + minCameraY / cameraHeight;
		const maxScreenX = inMaxX ? 1 : 1 - (maxCameraX - textureWidth) / cameraWidth;
		const minScreenY = inMaxY ? 0 : (maxCameraY - textureHeight) / cameraHeight;
		renderer.renderTexture(this.editor.texture, minScreenX, minScreenY, maxScreenX, maxScreenY, inMinX ? minCameraX : 0, inMinY ? minCameraY : 0, inMaxX ? Math.min(maxCameraX, textureWidth - 1) : textureWidth - 1, inMaxY ? Math.min(maxCameraY, textureHeight - 1) : textureHeight - 1);
	}
};

ImageEditorImageComponent.prototype.click = function(x, y){
	const pixelX = Math.floor(this.minCameraX + (this.maxCameraX - this.minCameraX) * x);
	const pixelY = Math.floor(this.maxCameraY - (this.maxCameraY - this.minCameraY) * y);
	if (pixelX >= 0 && pixelX < this.editor.texture.width && pixelY >= 0 && pixelY < this.editor.texture.height){
		this.editor.currentTool.processClick(pixelX, pixelY, this.editor);
	}
};

ImageEditorImageComponent.prototype.scroll = function(amount){
	// Zoom to the mouse
	if (this.state.isMouseOver()){
		const mouseX = this.state.getMouseX();
		const mouseY = this.state.getMouseY();
		const cameraWidth = this.maxCameraX - this.minCameraX;
		const cameraHeight = this.maxCameraY - this.minCameraY;
		const scrollSpeed = this.scrollSpeed;
		this.minCameraX -= mouseX * cameraWidth * scrollSpeed * amount;
		this.maxCameraX += (1 - mouseX) * cameraWidth * scrollSpeed * amount;
		this.minCameraY -= (1 - mouseY) * cameraHeight * scrollSpeed * amount;
		this.maxCameraY += mouseY * cameraHeight * scrollSpeed * amount;
		this.state.getManager().markDirty();
	}
};

ImageEditorImageComponent.prototype.update = function(){
	if (this.pressedKeys['ArrowLeft']) {
		const speed = this.cameraSpeed * (this.maxCameraX - this.minCameraX);
		this.minCameraX -= speed;
		this.maxCameraX -= speed;
		this.state.getManager().markDirty();
	}
	if (this.pressedKeys['ArrowRight']){
		const speed = this.cameraSpeed * (this.maxCameraX - this.minCameraX);
		this.minCameraX += speed;
		this.maxCameraX += speed;
		this.state.getManager().markDirty();
	}
	if (this.pressedKeys['ArrowDown']) {
		this.minCameraY += this.cameraSpeed;
		this.maxCameraY += this.cameraSpeed;
		this.state.getManager().markDirty();
	}
	if (this.pressedKeys['ArrowUp']){
		this.minCameraY -= this.cameraSpeed;
		this.maxCameraY -= this.cameraSpeed;
		this.state.getManager().markDirty();
	}
};

ImageEditorImageComponent.prototype.keyDown = function(key){
	this.pressedKeys[key] = true;
};

ImageEditorImageComponent.prototype.keyUp = function(key){
	this.pressedKeys[key] = false;
};