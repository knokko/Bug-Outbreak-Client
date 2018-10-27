ModelViewMode.REAL = {
	render : function(renderer, modelBuilder, cameraMatrix){
		renderer.renderModels(0, 0, 1, 1, cameraMatrix, [modelBuilder]);
	}
};