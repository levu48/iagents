Controller = function() {
	this.clients = {};

	// use client's username as id
	this.getClientId = function(client) {
		if (!client) return null;
		return client.username; 
	}

	this.register = function(client) { // client is an object
		var id = this.getClientId(client);
		console.log("SHOULD BE username: " + id );
		console.log("client.username = " + client.username);
		if (id) {
			this.clients["" + id + ""] = client;
			console.log("add object to clients: " + this.clients[id].username);
		} else {
			console.log("Controller.register: id is null.");
		}
	}

	this.getClient = function(clientId) {
		if (!clientId) return null;
		return this.clients[clientId];
	}

	this.send = function(clientId, obj) {
		var client = this.getClient(clientId);
		client.receive(obj);
	}
}

/* testing
controller = new Controller();
var client = {
	username: 'levu48',
	data: 'this is my data'
};

controller.register(client);
console.log(controller.getClient('levu48').username);
*/