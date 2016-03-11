if (Meteor.isClient) {
	client = null;	// global var, null until REGISTER

	processCommand = function (str) {
		if (str == null) 
			return;

		if (str === 'RUN') {
			console.log("RUN client " + Meteor.user().username);
			session.match();

		} else if (str.startsWith('SEND ')) {
			var substr = str.substring(5);
			try {
				var obj = JSON.parse(substr);
				var message = new Message(obj);
				message.dbInsert();
			} catch (err) {
				console.log(err);
			}

		} else if (str == 'REGISTER') {
			client = new Client(Meteor.user().username);
			Meteor.call("register", client);

		} else if (str.startsWith('INIT ')) {
			var tmp = str.substring(5);
			var arr = tmp.split(" ");
			var x = Number(arr[0]);
			var y = Number(arr[1]); 
			Meteor.call("init", x, y, Meteor.user().username);
			session.assert(new Actor(x, y, Meteor.user().username));

		} else if (str.startsWith('MOVE ')) {
			var tmp = str.substring(5);
			var arr = tmp.split(" ");
			var x = Number(arr[0]);
			var y = Number(arr[1]);
			Meteor.call("changePosition", x, y, Meteor.user().username);
			session.assert(new Action(Meteor.user().username, "MOVE", x, y));
			
		} 
	}
}