nools = Meteor.npmRequire("nools");
Fibers = Meteor.npmRequire("fibers");
controller = new Controller();

Meteor.methods({
	'send': function(sender, receiver, cmd, info) {
		Messages.insert({
			sender: sender,
			receiver: receiver,
			cmd: cmd,
			info: info,
			timestamp: new Date()
		});
	},

	'register': function(client) {
		//Clients.insert(client);
		
		Clients.insert({
			username: client.username,
			status: 'registered',
			timestamp: new Date()
		});
		
	},

	'init': function(x, y, name) {
		var actor = Actors.findOne({name: name});
		if (!actor) {
			Actors.insert({
				name: name,
				position: "[" + x + ", " + y + "]",
				shape: "square",
				color: "blue",
				extra: {}
			})
		} else {
			actor.position = "[" + x + ", " + y + "]";
			Actors.update(actor._id, actor);
		}
	}, 

	'position': function (x, y, name) {
		var actor = Actors.findOne({name: name});
		if (actor) {
			actor.position = "[" + x + "," + y + "]";
			Actors.update(actor._id, actor);
		}
	},

	'start3': function() {
		Fibers(function() {
			var dir = 'C:/thach/dev/meteor/iagents/public';
			var sourceUrl = '/rules/server/expert.js';
			var fs = Npm.require("fs");

			fs.readFile(dir + sourceUrl, "utf8", function(err, res) {
				if (err) {
					console.log(err);

				} else {
					flow = nools.compile(res, {
						name: "Hello World",
						define: { Message: Message }
					});
					session = flow.getSession();

					Fibers(function() {
						Messages.find().observe({
							added: function(message) {
								console.log("SERVER: message added. " + message.sender);
								if (message.receiver == 'server') { 
									session.assert(new Message(message));
									session.match();
								}
							}
						});
					});

				}
			});
		}).run();
	},

	'start': function() {
		var sourceUrl = 'rules/server/expert.js';
		var content = Assets.getText(sourceUrl); // sync
		flow = nools.compile(content, {
			name: "Hello World",
			define: { Message: Message }
		});
		session = flow.getSession();

		Messages.find().observe({
			added: function(message) {
				console.log("SERVER: message added. " + message.sender);
				if (message.receiver == 'server') { 
					session.assert(new Message(message));
					session.match();
				}
			}
		});

	},

	'start2': function() {
		// var sourceUrl = '/rules/server/server.js';
		var sourceUrl = '/rules/server/expert.js?ts=' + Date();
		HTTP.get(Meteor.absoluteUrl(sourceUrl), function(err, res) {
			if (err) {
				console.log(err);

			} else {
				flow = nools.compile(res.content, {
					name: "Hello World",
					define: { Message: Message }
				});
				session = flow.getSession();

				Messages.find().observe({
					added: function(message) {
						console.log("SERVER: message added. " + message.sender);
						if (message.receiver == 'server') { 
							session.assert(new Message(message));
							session.match();
						}
					}
				});
			}
		});
	},

	'run': function(e) {
		console.log("start run on server ...");
		//session.match();
		session.match(function(err){
		    if(err){
		        console.error(err.stack);
		    }else{
		        console.log("done run on server.");
		    }
		})
	}

});