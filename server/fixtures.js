if (Messages.find().count() === 0) {
	Messages.insert({
		username: "system",
		message: 'Welcome to iAgents System',
		timestamp: new Date(),
	});
}

if (Actors.find().count() === 0) {
	Actors.insert({
		name: "A",
		position: "[100,100]",
		shape: "square",
		color: "red",
		extra: {}
	});

	Actors.insert({
		name: "B",
		position: "[50,150]",
		shape: "square",
		color: "blue",
		extra: {}
	});

	Actors.insert({
		name: "C",
		position: "[150,200]",
		shape: "square",
		color: "purple",
		extra: {}
	});
}