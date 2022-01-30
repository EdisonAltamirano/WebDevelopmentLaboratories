// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var hotels = [
  {
    routeName: "sheraton",
    name: "Sheraton Hotel",
    email: "sheraton@gmail.com",
    phone: "8121478665",
    id: "sheraton123"
  },
  {
    routeName: "hilton",
    name: "Hotel Hilton",
    email: "hilton@gmail.com",
    phone: "8121478666",
    id: "hilton123"
  },
  {
    routeName: "paraiso",
    name: "Hotel Paraiso",
    email: "paraiso@gmail.com",
    phone: "8121478667",
    id: "paraiso123"
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all hotels
app.get("/api/tables", function(req, res) {
  return res.json(hotels);
});

// Displays a single character, or returns false
app.get("/api/tables/:table", function(req, res) {
  var chosen = req.params.table;

  console.log(chosen);

  for (var i = 0; i < hotels.length; i++) {
    if (chosen === hotels[i].routeName) {
      return res.json(hotels[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newcharacter = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newcharacter);

  hotels.push(newcharacter);

  res.json(newcharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
