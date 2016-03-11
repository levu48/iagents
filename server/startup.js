	Meteor.startup(function() {
		Messages.remove({});
		Meteor.call('start');
	});