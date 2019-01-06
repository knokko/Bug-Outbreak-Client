function GuiModelEditor(name, modelBuilder, save, saveAs, exit){
	this.didInit = false;
	this.components = [];

	this.name = name;
	this.builder = modelBuilder;

	// Just once
	this.builder.parts[0].setState();
	this.save = save;
	this.saveAs = saveAs;
	this.exit = exit;

	this.hasChanges = false;

	// Initialize in addComponents
	this.camera = null;
	this.viewMode = ModelViewMode.ABSTRACT;
	this.selectMode = ModelEditorSelectModes.createDefault(this);
	this.selected = null;
}

extendProtoType(Gui.Menu, GuiModelEditor);

GuiModelEditor.prototype.backgroundColor = 'rgb(0,50,250)';

GuiModelEditor.prototype.tabProperties = TextProperties.tab('rgb(200,200,250)', 'rgb(150,150,250)');
GuiModelEditor.prototype.tabHoverProperties = TextProperties.hoverTab('rgb(170,170,250)', 'rgb(120,120,250)');
GuiModelEditor.prototype.tabActiveProperties = TextProperties.tab('rgb(130,130,250)', 'rgb(100,100,250)');

GuiModelEditor.prototype.addComponents = function(){
	this.camera = new Gui3D.Camera(70, 1, 100000, this.state.getWidth(), this.state.getHeight(), 0, 0, 5, 0, 0, 0);

	// The components responsible for rendering the current state of the model
	this.addComponent(new Gui.BackgroundComponent(this.backgroundColor), 0.0, 0.9, 1.0, 1.0);
	this.addComponent(new ModelEditorModelComponent(this), 0.05, 0.05, 0.95, 0.9);

	// The toolbars
	this.addFullComponent(ModelEditorToolbars.createFile(this));
	this.addFullComponent(ModelEditorToolbars.createAdd(this));
	this.addFullComponent(ModelEditorToolbars.createBind(this));
	this.addFullComponent(ModelEditorToolbars.createSelect(this));

	// The component at the right of the screen
	this.rightComponent = new Gui.WrapperComponent(new Gui.BackgroundComponent('rgb(150,150,150)'));
	this.addComponent(this.rightComponent, 0.7, 0, 1, 0.9);
};

GuiModelEditor.prototype.keyDown = function(key){
	if (this.selectMode !== null){
		this.selectMode.keyDown(key);
	}
	Gui.Menu.prototype.keyDown.call(this, key);
};

GuiModelEditor.prototype.setPopup = function(popup){
	if(popup){
		this.state.getManager().setMainComponent(new Gui.PopupMenu(this, popup, 0.25, 0.25, 0.75, 0.75));
	} else {
		this.state.getManager().mainComponent.onClose();
		this.state.getManager().setMainComponent(this);
	}
};

GuiModelEditor.prototype.setViewMode = function(view){
	this.viewMode = view;
	this.state.getManager().markDirty();
};

GuiModelEditor.prototype.setSelectMode = function(mode){
	this.selectMode = mode;
	mode.onOpen();
	this.state.getManager().markDirty();
};

GuiModelEditor.prototype.setSelected = function(selected){
	this.selected = selected;
	if (selected){
		selected.onOpen();
	}
	this.state.getManager().markDirty();
}

GuiModelEditor.prototype.setRightComponent = function(component){
	this.rightComponent.setComponent(component);
};

const ModelEditorToolbars = {
	upperProps : TextProperties.label('black', 'rgb(200,200,250)'),
	upperHoverProps : TextProperties.label('black', 'rgb(170,170,250)'),
	upperActiveProps : TextProperties.label('black', 'rgb(130,130,250)'),

	props : TextProperties.listElement('rgb(180,180,250)', 'rgb(40,40,60)'),
	hoverProps : TextProperties.listElement('rgb(120,120,250)', 'rgb(30,30,40)')
};

const ModelEditorPopups = {
	labelProps : TextProperties.label('rgb(200,200,200)'),
	buttonProps : TextProperties.button('rgb(100,0,200)', 'rgb(200,0,255)'),
	buttonHoverProps : TextProperties.hoverButton('rgb(130,0,255)', 'rgb(255,0,255)'),
	backgroundColor : 'rgb(25, 0, 100)'
};