

Template.clientEngine.events({
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

Template.clientEngine.helpers({
	rulesText: function(filePath) {
		HTTP.get(Meteor.absoluteUrl(filePath), function(err, res) {
			Session.set("rulesText", res.content);
		});
		return Session.get("rulesText");
	}
});


Template.messages.helpers({
	messages: function() {
		return Messages.find({}, {sort: {timestamp: -1}});
	},
});

Template.message.helpers({
	timestamp: function() {
		return this.timestamp.toLocaleString();
	},
	userEmail: function() {
		return Meteor.user().emails[0].address;
	},
	username: function () {
		return this.username;
	}
});

