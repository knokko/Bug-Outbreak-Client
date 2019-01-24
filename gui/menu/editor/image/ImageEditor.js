function GuiImageEditor(texture, onDone, onSave, onCancel, backgroundColor, props, hoverProps, toolbarUpperProps, toolbarUpperHoverProps, toolbarUpperActiveProps, toolbarProps, toolbarHoverProps){

	// Necessary because it inherits from Gui.Menu
	this.didInit = false;
	this.components = [];

	// Important variables, notice that the texture should be of type Gui.Texture
	this.texture = texture.clone();
	this.onDone = onDone;
	this.onSave = onSave;
	this.onCancel = onCancel;

	// Default tool and color
	this.currentTool = ImageEditorTools.Pixel;
	this.currentColor = {
		red: 255,
		green: 100,
		blue: 100,
		alpha: 255
	};

	// Layout variables
	this.backgroundColor = backgroundColor;
	this.props = props;
	this.hoverProps = hoverProps;
	this.toolbarUpperProps = toolbarUpperProps;
	this.toolbarUpperHoverProps = toolbarUpperHoverProps;
	this.toolbarUpperActiveProps = toolbarUpperActiveProps;
	this.toolbarProps = toolbarProps;
	this.toolbarHoverProps = toolbarHoverProps;
}

extendProtoType(Gui.Menu, GuiImageEditor);

GuiImageEditor.prototype.addComponents = function(){
	this.addComponent(new ImageEditorImageComponent(this), 0.1, 0.1, 0.8, 0.8);
	this.addFullComponent(ImageEditorToolbars.createFile(this));
};

GuiImageEditor.prototype.setImage = function(image){
	this.texture = image.clone();
	this.state.getManager().markDirty();
};

const ImageEditorToolbars = {};

const ImageEditorTools = {};