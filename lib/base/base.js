Messages = new Meteor.Collection("messages");
Clients = new Meteor.Collection("clients");
Actors = new Meteor.Collection("actors");

Message = function(obj) {
	this.sender = obj.sender;
	this.receiver = obj.receiver;
	this.cmd = obj.cmd;
	this.info = obj.info;
	this.ts = new Date();
}

Message.prototype.dbInsert = function() {
	Messages.insert({
		sender: this.sender,
		receiver: this.receiver,
		cmd: this.cmd,
		info: this.info,
		ts: this.ts
	});
}


Client = function(username) {
	this.username = username;
	this.data = {};
}

Client.prototype = {
	contructor: Client,

	receive: function(obj) {
		this.data = obj;
	},

	clone: function() {
		var client = new Client(this.username);
		client.data = this.data;
		return client;
	},

	equals: function(other) {
		if (!(other instanceof Client))
			return false;
		return EJSON.stringify(this) == EJSON.stringify(other);
	},

	typeName: function() {
		return "Client";
	},

	toJSONValue: function() {
		return {
			username: this.username,
			data: this.data
		};
	}
};

EJSON.addType("Client", function fromJSONValue(value) {
	var client = new Client(value.username);
	client.data = value.data;
	return client;
});


Personal = function(obj) {
	this.username = obj.username,
	this.location = obj.location,
	this.city = obj.city,
	this.state = obj.state,
	this.style = obj.style,
	this.price = obj.price
}

Personal.prototype = {
	constructor: Personal,

	get: function(key) {
		return this[key];
	},

	isKey: function(key) {
		return this.hasOwnProperty(key);
	}
}


Info = function(str) {
	this.str = str;
};


sleep = function (milliseconds) {
	var req = new XMLHttpRequest();
	req.open("GET", "http://192.0.2.0/", false);
	req.timeout = milliseconds;
	try {
		req.send();
	} catch (ex) {
		
	}
}


readFile = function(fileName) {
	HTTP.get(Meteor.absoluteUrl(fileName), function(err, res) {
		if (err) {
			Session.set("rulesText", err);
		}
		Session.set("rulesText", res.content);
	});
};

if (Meteor.isServer) {

	Messages.deny({
		insert: function(userId, doc) {
			return (userId === null);
		},
		update: function(userId, doc, fieldNames, modifier) {
			return true;
		},
		remove: function(userId, doc) {
			return true;
		}
	});

	Messages.allow({
		insert: function (userId, doc) {
			return (userId !== null);
		}
	});

	Meteor.publish("messages", function () {
		return Messages.find({}, {sort: {timestamp: -1}});
	});

	Meteor.publish("actors", function() {
		return Actors.find();
	});

	/*
	Messages.find().observe({
		added: function(message) {
			// NOTE: remove this if condition will cause session not created !!! why?
			if (message.receiver == 'server') { 
				session.assert(new Message(message));
				session.match();
			}
		}
	});
	*/
	
	
}

if (Meteor.isClient) {
	Accounts.ui.config({
		passwordSignupFields: 'USERNAME_AND_EMAIL'
	});

	Meteor.subscribe('messages');
	Meteor.subscribe('actors');

	Clients.find().observe({
		added: function(client) {
			console.log("client added. client.username = " + client.username);
			session.assert(new Info("hello world goodbye"));
			session.match();
		}
	});

	/*
	Account.onLogin(function() {
		console.log("User logged in", Meteor.user().username); // Meteor.user() creates problem
	});
	*/
	
	/* OUT OF SYNC if DO THIS HERE! MOVE THE FOLLOWING SECTION OF CODE TO ECOM.HTML
	Messages.find().observe({
		added: function(message) {
			if (message.receiver == Meteor.user().username) {
				session.assert(new Message(message));
				session.match();
			}
			
		}
	});
	*/
	
	
}

