function ModelEditorRenderComponent(editor){
	this.editor = editor;
	this.movingLeft = false;
	this.movingRight = false;
	this.movingForward = false;
	this.movingBackward = false;
	this.movingUp = false;
	this.movingDown = false;
}

ModelEditorRenderComponent.prototype.render = function(renderer){
	this.editor.viewMode.render(renderer, this.editor.builder, this.editor.camera.getMatrix());
};

ModelEditorRenderComponent.prototype.update = function(){
	//
};

ModelEditorRenderComponent.prototype.keyDown = function(key){
	if (key === ''){
		this.movingLeft = true;
	}
};