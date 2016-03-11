define Info2 {
	username: '',
	text: '',
	constructor: function(username, text) {
		this.username = username;
		this.text = text;
	}
}

rule takeRequest {
	when {
		m: Message m.receiver == 'server' && m.info.goal == 'buy' && m.info.product == 'clothes';
		//m: Message;

	} then {
		console.log("EXECUTE rule takeRequest");
		assert(new Info2(m.sender, 'request for location'));
	}
}

rule askLocation {
	when {
		m: Info2 m.text == 'request for location';

	} then {
		console.log("EXECUTE rule askLocation " + m.username);
		Fibers(function() {
			Meteor.call('send', 'server', m.username, 'REQUEST', {msg: 'request for location', key: 'location'});
		}).run();
		
	}
}

rule provideLocations {
	when {
		m: Message m.receiver == 'server' && m.cmd == 'LOCATION' && m.info.location == 'Garden Grove';

	} then {
		console.log("EXECUTE rule provideLocation " + m.info.location);
		Fibers(function() {
			Meteor.call('send', 'server', m.username, 'ANSWER', {msg: 'South Coast Plaza, Costa Mesa, CA'});
		}).run();
	}
}

rule noLocation {
	when {
		m: Message m.receiver == 'server' && m.cmd == 'LOCATION' && m.info.location == null;

	} then {
		console.log("EXECUTE rule noLocation " + m.cmd);
		Fibers(function() {
			Meteor.call('send', 'server', m.username, 'ANSWER', {msg: 'Rodeo Drive, Los Angeles, CA'});
		}).run();
	}
}