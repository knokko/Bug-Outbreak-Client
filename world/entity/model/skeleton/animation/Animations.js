function createEntitySkeletonPartAnimation(input){
	const ordinal = input.readByte();
	if(ordinal === EntitySkeletonAnimationNone.prototype.ordinal){
		return new EntitySkeletonAnimationNone();
	}
	throw 'Unknown animation ordinal: ' + ordinal;
}