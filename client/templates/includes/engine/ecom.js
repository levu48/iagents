Template.ecom.events({
	'click .command': function(e) {
		var el = document.getElementById('commandText');
		if (el !== null) {
			var str = el.value;
		    processCommand(str);
		}
		el.value = "";
		el.focus();
	}, 
	
	'keyup #command': function(e) {
		if (e.type == "keyup" && e.which == 13) {
			var el = document.getElementById('commandText');
			if (el !== null) {
				var str = el.value;
			    processCommand(str);
			}
			el.value = "";
			el.focus();
		}
	}
});

Template.clientMessages.helpers({
	messages: function() {
		return Messages.find({receiver: Meteor.user().username}, {sort: {ts: -1}});
	},
});