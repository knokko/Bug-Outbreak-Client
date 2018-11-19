ModelViewMode.ABSTRACT = {
	render : function(renderer, modelBuilder, cameraMatrix, editor){
		const parts = modelBuilder.parts;
		const matrices = modelBuilder.matrices;
		const positions = modelBuilder.positions;
		const posLength = positions.length;
		const points = new Array(posLength);
		for (let index = 0; index < posLength; index += 3){
			const vec3 = new Vectors.Vector3(positions[index], positions[index + 1], positions[index + 2]);
			const vec4 = parts[matrices[index / 3]].matrix.transform(vec3);
			cameraMatrix.transform(vec4, vec4);
			if (vec4.w < 0) {
				vec4.w = -vec4.w;
			}
			points[index] = (vec4.x / vec4.w + 1) / 2;
			points[index + 1] = (vec4.y / vec4.w + 1) / 2;
			points[index + 2] = vec4.z / vec4.w;

			/*
			about the Z-coordinate:
			z = 1 means that the vertex is at the far plane of the cameraMatrix
			z = 0 is a bit unclear, but it means the vertex is close to 2 * nearPlane
			z = -1 means that the vertex is at the near plane of the camera
			*/

			// Add support for circles later
			if (points[index + 2] > - 1 && points[index + 2] < 1){
				const size = 0.26 - (1 + points[index + 2]) / 8;
				renderer.fillRect(editor.selected instanceof ModelEditorSelectedVertex && editor.selected.index === index / 3 ? 'rgb(200,0,0)' : 'rgb(0,0,0)', points[index] - size, points[index + 1] - size, points[index] + size, points[index + 1] + size);
			}
		}
	}
};