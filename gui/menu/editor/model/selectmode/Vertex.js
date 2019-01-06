ModelEditorSelectModes.Vertex = function(editor, onEnter, onCancel){
	this.editor = editor;
	this.onEnter = onEnter;
	this.onCancel = onCancel;
};

ModelEditorSelectModes.createDefault = function(editor){
	return new ModelEditorSelectModes.Vertex(editor, function(index){

		// TODO don't create new menus all the time
		editor.setSelected(new ModelEditorSelectedVertex(editor, index));
	});
};

ModelEditorSelectModes.Vertex.prototype.onOpen = function(){
	this.editor.setRightComponent(this.onCancel ? this.infoMenuWithCancel : this.infoMenuWithoutCancel);
};

ModelEditorSelectModes.Vertex.prototype.click = function(x, y){
	const camera = this.editor.camera;

	// Calculate the click vector (the vector that points towards the clicked place if it starts at the camera position)
	const clickYaw = toRadians(camera.getYaw() + (x - 0.5) * camera.getFOV());
	const clickPitch = toRadians(camera.getPitch() - (y - 0.5) * camera.getFOV());
	const cosPitch = Math.cos(clickPitch);
	const clickVectorX = Math.sin(clickYaw) * cosPitch;
	const clickVectorY = -Math.sin(clickPitch);
	const clickVectorZ = -Math.cos(clickYaw) * cosPitch;

	// Cache those variables because they will be accessed a lot
	const cameraX = camera.getX();
	const cameraY = camera.getY();
	const cameraZ = camera.getZ();

	const positions = this.editor.builder.positions;
	const parts = this.editor.builder.parts;
	const matrices = this.editor.builder.matrices;

	// Use this to store the score (distanceSQ) of the point that is closest to the spot the user clicked on
	let closestPointIndex = -1;
	let closestPointScore = 100;

	const length = positions.length;
	for (let index = 0; index < length; index += 3){

		// Calculate the space position of the point
		const vec3 = new Vectors.Vector3(positions[index], positions[index + 1], positions[index + 2]);
		const vec4 = parts[matrices[index / 3]].matrix.transform(vec3);

		// Calculate the difference between the space position of the point and the camera position
		let differenceX = vec4.x - cameraX;
		let differenceY = vec4.y - cameraY;
		let differenceZ = vec4.z - cameraZ;

		// Normalize the difference
		const totalDifference = Math.sqrt(differenceX * differenceX + differenceY * differenceY + differenceZ * differenceZ);
		differenceX /= totalDifference;
		differenceY /= totalDifference;
		differenceZ /= totalDifference;

		// Calculate the score of this point
		const dx = differenceX - clickVectorX;
		const dy = differenceY - clickVectorY;
		const dz = differenceZ - clickVectorZ;

		// Compare the score of this point with the score of the closest point
		const score = dx * dx + dy * dy + dz * dz;
		if (score < closestPointScore){
			closestPointIndex = index / 3;
			closestPointScore = score;
		}
	}

	if (closestPointIndex !== -1){
		this.onEnter(closestPointIndex);
	}
};

ModelEditorSelectModes.Vertex.prototype.keyDown = function(key){
	if (this.onCancel && key === 'Escape'){
		this.onCancel();
	}
};

ModelEditorSelectModes.Vertex.prototype.createInfoMenu = function(canCancel){
	return new Gui.Menu('rgb(150,150,150)', function(){
		// TODO Improve layout
		this.addComponent(new Gui.TextComponent('Click on a vertex to select it.', TextProperties.label()), 0.03, 0.85, 0.8, 0.9);
		this.addComponent(new Gui.TextComponent('Press enter to choose the vertex that is selected.', TextProperties.label()), 0.03, 0.75, 0.97, 0.8);
		if (canCancel){
			this.addComponent(new Gui.TextComponent('Press escape to cancel the vertex selection.', TextProperties.label()), 0.03, 0.45, 0.9, 0.5);
		}
	});
};

ModelEditorSelectModes.Vertex.prototype.infoMenuWithCancel = ModelEditorSelectModes.Vertex.prototype.createInfoMenu(true);
ModelEditorSelectModes.Vertex.prototype.infoMenuWithoutCancel = ModelEditorSelectModes.Vertex.prototype.createInfoMenu(false);