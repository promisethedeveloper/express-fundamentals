const express = require("express");

const app = express();

// This helps us send json data and it will be parsed as json(this is commonly used for APIs)
app.use(express.json());
// This tells express to also pass the body as form data, if it is form data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("HOMEPAGE!");
});

app.get("/dogs", (req, res) => {
	console.log("YOU ASKED FOR /DOGS!");
	res.send("<h1>I AM DOG WOOF WOOF</h1>");
});

app.get("/chickens", (req, res) => {
	res.send("BOCK BOCK BOCK (get request)");
});

app.post("/chickens", function createChicken(req, res) {
	res.send("YOU CREATED A NEW CHICKEN (not really) (Post request)");
});

const greetings = {
	en: "hello",
	fr: "bonjour",
	ic: "halló",
	js: "konnichiwa",
};

// Defining a URL parameter(url path)
app.get("/greet/:language", (req, res) => {
	// req.params.language is a key
	const lang = req.params.language;
	const greeting = greetings[lang];
	if (!greeting) {
		return res.send("INVALID LANGUAGE!");
	}
	return res.send(greeting);
});

// Catching a query string from the  e.g /search?term=chickens&sort=top
app.get("/search", (req, res) => {
	// If query strings are not passed, the default values will be used
	const { term = "Chelsea", sort = "top" } = req.query;
	res.send(`SEARCH PAGE! Term is: ${term}, sort is ${sort}.`);
});

app.get("/show-me-headers", (req, res) => {
	console.log(req.rawHeaders);
	console.log(req.headers);
	res.send(req.headers);
});

app.get("/show-language", (req, res) => {
	// we need to use the square bracket because "accept-language" is not a valid JS identifier
	const lang = req.headers["accept-language"];
	res.send(`Your language preference is: ${lang}`);
});

app.post("/register", (req, res) => {
	res.send(`Welcome, ${req.body.username}`);
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
