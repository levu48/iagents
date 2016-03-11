SEND {"sender": "server", "receiver": "levu48", "cmd": "GREET", "info":{"mesg": "hello world goodbye"}}
SEND {"sender": "levu48", "receiver": "server", "cmd": "GREET", "info":{"mesg": "hello world"}}
SEND {"sender": "levu48", "receiver": "server", "cmd": "ASK", "info":{"mesg": "where to buy clothes?", "goal": "buy", "product": "clothes"}}


////////////////////////////////////////////////// Excerpt from ecom.html

source = document.getElementById("rules").innerHTML;
flow = nools.compile(source, {
	name: "rules",
	define: {
		Message: Message
	},
	scope: {
		sleep: sleep
	}
});

Actor = flow.getDefined("Actor");
Action = flow.getDefined("Action");

session = flow.getSession();

session.on("assert", function(fact) {
	console.log("event: on assert, fact = " + fact);
});


//////////////////////////////////////////////////////////////////////////

'startEngine2': function() {
	flow = nools.flow("Hello World", function(flow) {
		this.rule("Hello", [Info, "m", "m.str =~ /^hello(\\s*world)?$/"], function(facts) {
			console.log(facts.m.str + " (*)");
			facts.m.str = facts.m.str + " goodbye";
			this.modify(facts.m);
			Fibers(function() {
				Meteor.call("createMessage", "server", "all", "GREET", "got hello world, added goodbye.");
			}).run();
		});

		this.rule("Goodbye", [Info, "m", "m.str =~ /.*.goodbye$/"], function(facts) {
			console.log(facts.m.str + " (**)");
			Fibers(function() {
				Meteor.call("createMessage", facts.m.str + " (**)", "server");
			}).run();
		});

		this.rule("HWGoodbye", [Info, "m", "m.str =~ /^hello world goodbye$/"], function(facts) {
			console.log(facts.m.str + " (***)");
			Fibers(function() {
				Meteor.call("createMessage", facts.m.str + " (***)", "server");
			}).run();
		});

		this.rule("ProcessASK", [Info, "m", "m.str == 'ASK goal:buy product:watch'"], function(facts) {
			console.log("process ASK request");
			Fibers(function() {
				Meteor.call("createMessage", "ANSWER {message: 'where is your location?'}", "server");
			}).run();
		})
	});
	session = flow.getSession();
},