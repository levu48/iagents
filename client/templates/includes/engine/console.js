Template.console.helpers({
	messages: function() {
		return Messages.find({}, {sort: {ts: -1}});
	},
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MM-DD-YYYY');
});