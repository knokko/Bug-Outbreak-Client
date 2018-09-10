function EntitySkeletonAnimationNone(){}

EntitySkeletonAnimationNone.prototype.getExtraPitch = function(moveProgress, attackProgress){
	return 0;
};

EntitySkeletonAnimationNone.prototype.getExtraYaw = function(moveProgress, attackProgress){
	return 0;
};

EntitySkeletonAnimationNone.prototype.getExtraRoll = function(moveProgress, attackProgress){
	return 0;
};

EntitySkeletonAnimationNone.prototype.ordinal = 0;