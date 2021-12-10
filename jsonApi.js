const express = require("express");

const app = express();

// This helps us send json data and it will be parsed as json(this is commonly used for APIs)
app.use(express.json());

const CANDIES = [
	{ name: "snickers", qty: 43, price: 1.5 },
	{ name: "skittles", qty: 26, price: 0.99 },
];

app.get("/candies", (req, res) => {
	// Ensures that we get a JSON back, even though res.send often sends JSON, if you pass it an object or an array
	res.json(CANDIES);
});

// Creating a new candy and setting a status code
app.post("/candies", (req, res) => {
	if (req.body.name.toLowerCase() === "circus peanuts") {
		res.status(403).json({ msg: "Horrible choice! circus peanuts forbidden!" });
	}
	CANDIES.push(req.body);
	res.status(201).json(CANDIES);
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
