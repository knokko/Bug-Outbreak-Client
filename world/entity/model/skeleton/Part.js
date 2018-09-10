function loadEntitySkeletonPart1(input){
	return new EntitySkeletonPart(input.readByte(), input.readInt(), input.readInt(), input.readInt(), input.readInt(), input.readInt(), input.readInt(), createEntitySkeletonPartAnimation(input));
}

function EntitySkeletonPart(parentIndex, x, y, z, pitch, yaw, roll, animation){
	this.parentIndex = parentIndex;
	this.x = x;
	this.y = y;
	this.z = z;
	this.pitch = pitch;
	this.yaw = yaw;
	this.roll = roll;
	this.animation = animation;
}

EntitySkeletonPart.prototype.save1 = function(output){
	output.writeByte(this.parentIndex);
	output.writeInt(this.x);
	output.writeInt(this.y);
	output.writeInt(this.z);
	output.writeInt(this.pitch);
	output.writeInt(this.yaw);
	output.writeInt(this.roll);
	this.animation.save1(output);
}