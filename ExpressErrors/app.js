const express = require("express");
const ExpressError = require("./expressError");

const app = express();

// This will run after every request comes in, and it tells express to do the next thing
// app.use((req, res, next) => {
// 	console.log("THE SERVER GOT A REQUEST!");
// 	next();
// });

function attemptToSaveToDB() {
	throw "Connection Error!";
}

const USERS = [
	{ username: "StacysMom", city: "Reno" },
	{ username: "Rosalia", city: "R" },
];

app.get("/users/:username", function (req, res, next) {
	try {
		const user = USERS.find((u) => u.username === req.params.username);
		if (!user) {
			throw new ExpressError("Invalid username", 404);
		}
		return res.send({ user });
	} catch (e) {
		next(e);
	}
});

app.get("/secret", (req, res, next) => {
	// Stupid authentication
	debugger;
	try {
		if (req.query.password != "popcorn") {
			throw new ExpressError("Invalid password", 403);
		}
		return res.send("Congratulations! You know your password.");
	} catch (e) {
		next(e);
	}
});

app.get("/savetodb", (req, res, next) => {
	try {
		attemptToSaveToDB();
		return res.send("Saved to Database!");
	} catch (e) {
		return next(new ExpressError("Database Error"));
	}
});

// This code will only run if non of the above routes were matched
app.use((req, res, next) => {
	const e = new ExpressError("Page Not Found", 404);
	next(e);
});

// This is the last ditch error handler - this is the function refered to by next(e)
app.use((error, req, res, next) => {
	// the default status is 500 Internal Server Error
	let status = error.status || 500;
	let message = error.msg;

	// set the status and alert the user
	return res.status(status).json({
		error: { message, status },
	});
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
