
define Actor {
	name: "John Doe",
	race: "Asian",
	nationality: "Vietnamese",
	age: "30",
	location: "California",
	language: ["English", "Vietnamese"],
	x: 0,
	y: 0,
	constructor: function(x, y, name) {
		this.x = x;
		this.y = y;
		this.name = name;
	}
}

define Counter {
	count: 0,
	constructor: function(count) {
		this.count = count;
	}
}


rule SeeYouAgain {
	salience: 100;
    when {
        m: Message m.cmd == 'GREET' && m.info.msg == 'hello world goodbye';
    }
    then {
    	console.log("GOT THE MATCH FOR cmd GREET");
		Meteor.call('send', Meteor.user().username, 'server', 'END', {msg: 'send completion message'});
		retract(m);
    }
}

rule cleanupMessage {
	when {
		m: Message;

	} then {
		console.log("sender " + m.sender + " to " + m.receiver + ": " + m.cmd);
		retract(m);
	}
}

rule NotCounter {
	when {
		not(c: Counter);

	} then {
		assert (new Counter(1));
	}
}


rule HaltCount {
	salience: 10;
	when {
		c: Counter c.count == 100;

	} then {
		retract(c);
		halt();
	}
}


rule UpdateActor {
	when {
		a : Actor;
		c : Counter;
	
	} then {
		//sleep(1000);
		//setTimeout(function() {
			x = Math.round(Math.random()*520);
			y = Math.round(Math.random()*350);

			Meteor.call('position', x, y, a.name);
			modify(a, function() {
				this.x = x;
				this.y = y;
			});

			modify(c, function() {
				this.count = c.count + 1;
			});
		//}, 1000);
	}
}