ImageEditorTools.Pixel = {
	processClick : function(x, y, editor){
		editor.texture.setPixel(x, y, editor.currentColor.red, editor.currentColor.green, editor.currentColor.blue, editor.currentColor.alpha);
		editor.state.getManager().markDirty();
	}
};