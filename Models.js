Game.models = {
	saveModelBuilder : function(modelBuilder, output){

		// Save the Skeleton
		output.writeByte(this.skeletonEncoding.PART_LIST_1);
		let length = modelBuilder.parts.length;
		output.writeByte(length - 1);
		for (let index = 0; index < length; index++){
			const part = modelBuilder.parts[index];
			output.writeByte(part.parentIndex);
			output.writeInt(part.x);
			output.writeInt(part.y);
			output.writeInt(part.z);
			output.writeInt(part.pitch);
			output.writeInt(part.yaw);
			output.writeInt(part.roll);
			if (part.animation instanceof Gui3D.NoAnimation){
				output.writeByte(this.animationEncoding.NONE);
			} else {
				part.animation.save(output);
			}
		}

		// Save the Texture
		output.writeByte(this.textureEncoding.CCB_RGB);
		output.writeChar(modelBuilder.texture.width);
		output.writeChar(modelBuilder.texture.height);
		const size = modelBuilder.texture.width * modelBuilder.texture.height;
		const textureData = modelBuilder.texture.data;
		for (let index = 0; index < size; index++) {
			output.writeByte(BitHelper.javaByteCast(textureData[index * 4]));
			output.writeByte(BitHelper.javaByteCast(textureData[index * 4 + 1]));
			output.writeByte(BitHelper.javaByteCast(textureData[index * 4 + 2]));
		}

		// Save the RawModel
		output.writeByte(this.modelEncoding.IICB);
		const positions = modelBuilder.positions;
		const textureCoords = modelBuilder.textureCoords;
		const matrices = modelBuilder.matrices;
		const indices = modelBuilder.indices;
		output.writeInt(matrices.length);
		length = positions.length;
		for (let index = 0; index < length; index++){
			output.writeInt(positions[index]);
		}
		length = textureCoords.length;
		for (let index = 0; index < length; index++) {
			output.writeChar(textureCoords[index]);
		}
		length = matrices.length;
		for (let index = 0; index < length; index++) {
			output.writeByte(matrices[index]);
		}
		length = indices.length;
		output.writeInt(length / 3);
		for (let index = 0; index < length; index++) {
			output.writeChar(indices[index]);
		}
	},
	loadModel : function(input){
		const skeleton = this.loadSkeleton(input);
		const texture = this.loadTexture(input);
		const model = this.loadRawModel(input);
		return new Gui3D.Model(model, texture, skeleton);
	},
	loadTexture : function(input){
		const encoding = input.readByte();
		if (encoding === this.textureEncoding.CCB_RGB){
			return this.loadTextureCCB_RGB(input);
		} else {
			throw 'Unknown texture encoding: ' + encoding;
		}
	},
	loadTextureCCB_RGB : function(input){
		const width = input.readChar();
		const height = input.readChar();
		const texture = new Gui.Texture(width, height);
		const size = width * height;
		for (let index = 0; index < size; index++){
			texture.data[index * 4] = input.readByte() & 0xFF;
			texture.data[index * 4 + 1] = input.readByte() & 0xFF;
			texture.data[index * 4 + 2] = input.readByte() & 0xFF;
			texture.data[index * 4] = 255;
		}
		return texture;
	},
	loadRawModel : function(input){
		const encoding = input.readByte();
		if (encoding === this.modelEncoding.IICB){
			return this.loadRawModelIICB(input);
		} else {
			throw 'Unkown raw model encoding: ' + encoding;
		}
	},
	loadRawModelIICB : function(input){
		const vertexCount = input.readInt();
		const positions = new Int32Array(vertexCount * 3);
		const textureCoords = new Uint16Array(vertexCount * 2);
		const matrices = new Int8Array(vertexCount);
		let length = positions.length;
		for (let index = 0; index < length; index++) {
			positions[index] = input.readInt();
		}
		length = textureCoords.length;
		for (let index = 0; index < length; index++) {
			textureCoords[index] = input.readChar();
		}
		for (let index = 0; index < vertexCount; index++) {
			matrices[index] = input.readByte();
		}
		const triangleCount = input.readInt();
		const indices = new Uint16Array(triangleCount * 3);
		length = indices.length;
		for (let index = 0; index < length; index++) {
			indices[index] = input.readChar();
		}
		return new Gui3D.RawModel(positions, textureCoords, matrices, indices);
	},
	loadSkeleton : function(input){
		const encoding = input.readByte();
		if (encoding === this.skeletonEncoding.PART_LIST_1){
			return this.loadSkeletonPartList1(input);
		} else {
			throw 'Unknown skeleton encoding: ' + encoding;
		}
	},
	loadSkeletonPartList1 : function(input){
		const partLength = input.readByte() + 1;
		const parts = new Array(partLength);
		for (let index = 0; index < partLength; index++){
			parts[index] = this.loadSkeletonPart1(input);
		}
		return new Gui3D.Skeleton(input);
	},
	loadSkeletonPart1 : function(input){
		const parentIndex = input.readByte();
		const x = input.readInt();
		const y = input.readInt();
		const z = input.readInt();
		const pitch = input.readInt();
		const yaw = input.readInt();
		const roll = input.readInt();
		const animation = this.loadSkeletonPartAnimation(input);
		return new Gui3D.SkeletonPart(parentIndex, x, y, z, pitch, yaw, roll, animation);
	},
	loadSkeletonPartAnimation : function(input){
		const type = input.readByte();
		if (type === this.animationEncoding.NONE){
			return new Gui3D.NoAnimation();
		} else {
			throw 'Unknown animation encoding: ' + type;
		}
	},
	modelEncoding : {
		IICB : -128
	},
	textureEncoding : {
		CCB_RGB : -128
	},
	skeletonEncoding : {
		PART_LIST_1 : -128
	},
	animationEncoding : {
		NONE : 0,
		MOVING_PITCH : 1,
		MOVING_YAW : 2,
		MOVING_ROLL : 3,
		ATTACK_PITCH : 4,
		ATTACK_YAW : 5,
		ATTACK_ROLL : 6,
		RANDOM_PITCH : 7,
		RANDOM_YAW : 8,
		RANDOM_ROLL : 9
	}
}