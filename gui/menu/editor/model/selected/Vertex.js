function ModelEditorSelectedVertex(modelBuilder, index){
	this.model = modelBuilder;
	this.index = index;
}

ModelEditorSelectedVertex.prototype.move = function(dx, dy, dz){
	this.model.positions[this.index * 3] += dx;
	this.model.positions[this.index * 3 + 1] += dy;
	this.model.positions[this.index * 3 + 2] += dz;
};