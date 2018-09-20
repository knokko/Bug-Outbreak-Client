function GuiModelEditor(name, saveMode, modelBuilder){
	this.didInit = false;
	this.components = [];

	this.name = name;
	this.saveMode = saveMode;
	this.builder = modelBuilder;
}

extendProtoType(Gui.Menu, GuiModelEditor);

GuiModelEditor.prototype.backgroundColor = 'rgb(0, 50, 250)';

GuiModelEditor.prototype.addComponents = function(){
	this.tabProperties = TextProperties.tab('rgb(200,200,250)', 'rgb(150,150,250)');
	this.tabHoverProperties = TextProperties.hoverTab('rgb(170,170,250)', 'rgb(120,120,250)');
	this.tabActiveProperties = TextProperties.tab('rgb(130,130,250)', 'rgb(100,100,250)');

	this.addFullComponent(new Gui.Toolbar());//TODO create toolbars...
};