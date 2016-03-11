Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return Meteor.subscribe('messages'); }
});

Router.route('/', {name: 'frontPage' });
Router.route('/dev', {name: 'dev'});
Router.route('/about', { name: 'about' });
Router.route('/demo', {name: 'demo'});
Router.route('/demo/rulesengine', {name: 'chat'});
Router.route('/demo/news', {name: 'demoNews'});
Router.route('/demo/iot', {name: 'demoIot'});

Router.route('/demo/clientengine', function() {
	this.layout('layoutBar', {
		data: function() { return Messages.find(); }
	});
	this.render('clientEngine');
});

Router.route('/demo/famous', function() {
	this.layout('layoutBlank', {
		data: function() { return Messages.find(); }
	});
	this.render('famous');
});

Router.route('/demo/ecom', function() {
	this.layout('layoutBar', {
		data: function() { return Messages.find(); }
	});
	this.render('ecom');
});

Router.route('/sys/console', function() {
	this.layout('layoutBar', {
		data: function() { return Messages.find(); }
	});
	this.render('console');
});
