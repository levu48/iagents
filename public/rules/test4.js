rule provideLocation {
    when {
        s: String s == 'INACTIVE';
        m: Message m.sender == 'server' && m.cmd == 'REQUEST' && m.info.msg == 'request for location';
    }
    then {
		Meteor.call('send', Meteor.user().username, 'server', 'LOCATION', {
			msg: 'response location, Garden Grove',
			location: 'Garden Grove'
		});
		retract(m);
    }
}


rule noLocation {
    when {

        m: Message m.sender == 'server' && m.cmd == 'REQUEST' && m.info.msg == 'request for location';
    }
    then {
		Meteor.call('send', Meteor.user().username, 'server', 'LOCATION', {
			msg: 'response location, null',
			location: null
		});
		retract(m);
    }
}

