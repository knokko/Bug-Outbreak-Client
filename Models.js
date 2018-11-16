Game.models = {
	loadModel : function(input){
		const skeleton = new Gui3D.Skeleton();
		const texture = new Gui.Texture();
		const model = new Gui3D.RawModel();
		return new Gui3D.Model(model, texture, skeleton);
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