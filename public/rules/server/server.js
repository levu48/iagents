rule HelloWorld {
	when {
		m: Message m.receiver == 'server' && m.info.msg == 'hello world';

	} then {
		m.info.msg += ' goodbye';
		modify(m);
		Fibers(function() {
			Meteor.call('send', 'server', m.sender, 'GREET', {msg: 'got hello world, added goodbye.'});
		}).run();
	}
}

rule HWGoodBye {
	when {
		m: Message m.receiver == 'server' && m.info.msg == 'hello world goodbye';

	} then {
		console.log(m.info.msg);
		Fibers(function() {
			Meteor.call('send', 'server', m.sender, 'GREET', {msg: m.info.msg});
		}).run();
	}
}
