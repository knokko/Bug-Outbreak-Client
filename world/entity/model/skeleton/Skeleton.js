const ENTITY_SKELETON_ENCODING_PART_LIST_1 = -128;

function EntitySkeleton(input){
	const encoding = input.readByte();
	if(encoding === ENTITY_SKELETON_ENCODING_PART_LIST_1){
		this.loadPartList1(input);
	}
	else {
		throw 'Unknown encoding: ' + encoding;
	}
}

EntitySkeleton.prototype.loadPartList1 = function(input){
	const partLength = input.readByte() + 1;
	this.parts = new Array(partLength);
	for(let index = 0; index < partLength; index++){
		this.parts[index] = loadEntitySkeletonPart1(input);
	}
}