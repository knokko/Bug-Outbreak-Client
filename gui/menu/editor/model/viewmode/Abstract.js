ModelViewMode.ABSTRACT = {
	render : function(renderer, modelBuilder, cameraMatrix){
		const skeleton = modelBuilder.skeleton;
		const matrices = modelBuilder.matrices;
		const positions = modelBuilder.positions;
		const posLength = positions.length;
		const points = new Array(posLength);
		for (let index = 0; index < posLength; index += 3){
			const vec3 = new Vectors.Vector3(positions[index], positions[index + 1], positions[index + 2]);
			const vec4 = skeleton.parts[matrices[index / 3]].matrix.transform(vec3);
			cameraMatrix.transform(vec4, vec4);
			if (vec4.w < 0) {
				vec4.w = -vec4.w;
			}
			points[index] = vec4.x / vec4.w;
			points[index + 1] = vec4.y / vec4.w;
			points[index + 2] = vec4.z / vec4.w;

			// Add support for circles later
			renderer.fillRect('rgb(0,0,0)', points[index] - 0.05, points[index + 1] - 0.05, points[index] + 0.05, points[index + 1] + 0.05);
		}
	}
};