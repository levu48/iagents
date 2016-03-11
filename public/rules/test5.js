

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
        console.log("EXECUTE provideLocation, Garden Grove");
		//retract(m);
    }
}


rule noLocation {
    when {
        //s: String s == 'INACTIVE';
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

rule personalPreferences {
    salience: 10;
    when {
        m: Message m.sender == 'server' && m.cmd == 'REQUEST';
        p: Personal p.isKey(m.info.key) && p[m.info.key] != null || undefined;
    
    } then {
        Meteor.call('send', Meteor.user().username, 'server', m.info.key, {
            msg: 'response',
            key: m.info.key,
            val: p[m.info.key]
        });
        retract(m);
    }
}

rule testPersonal {
    when {
        p: Personal;

    } then {
        console.log(p);
    }
}

