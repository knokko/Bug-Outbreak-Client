Game.models = {
	saveModelBuilder : function(modelBuilder, output){
		// First, do loading, then work on saving
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