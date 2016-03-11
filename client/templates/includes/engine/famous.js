Template.famous.helpers({
	actors: function() {
		return Actors.find();
	}
});

Template.actor.helpers({
	name: function() { return this.name; },
	size: function() { return this.size; },
	position: function() { 
		return { value: JSON.parse(this.position), transition: {duration: 1000} };
	},
	color: function() { return this.color; },
	extra: function() { return this.extra; }
});

ActorNode = function(actor) {
	famous.core.Node.call(this);
	this
		//.setMountPoint(0.5, 0.5)
		//.setAlign(0.5, 0.5)
		.setSizeMode('absolute', 'absolute')
		.setAbsoluteSize(50, 20);
		//.setPosition(100,100);
}

ActorNode.prototype = Object.create(famous.core.Node.prototype);
ActorNode.prototype.constructor = ActorNode;

FView.wrap('ActorNode', ActorNode);
