var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var testAPIRouter = require("./routes/testAPI");

var app = express();
//Express meets DB Client (pgp)
const pgp = require("pg-promise")({});
// This is the path to DB
var db = pgp("postgres://localhost:5432/eventonica");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//Middleware
// Declare After Cors
app.use(cors());
app.use(logger("dev"));
// data from client side - req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/testAPI", testAPIRouter);

// ROUTES //
// GET all Events
app.get("/events", async (req, res) => {
  try {
    const events = await db.any("SELECT * FROM events;", [true]);
    console.log({ events });
    res.json(events);
  } catch (err) {
    console.log(err);
  }
});

// Create an Event
app.post("/events", async (req, res) => {
  //async provides us await -> wait for function to complete before it continues//
  // returning star returns back that data we added
  try {
    const { name, date, location, category } = req.body;
    const newEvent = await db.one(
      "INSERT INTO events (name,date,location,category) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, date, location, category]
    );
    res.json(newEvent);
  } catch (err) {
    console.log(err);
  }
});

// Get A Specific Event
app.get("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await db.one("SELECT * FROM events where event_id = $1 ", [
      id,
    ]);
    res.json(event);
  } catch (err) {
    console.error(err.message);
  }
});

// Update a Event
app.put("/events/:id", async (req, res) => {
  try {
    console.log("here1");
    const { id } = req.params;
    const { name, date, location, category } = req.body;
    const updateEvent = await db.any(
      "UPDATE events SET name = $1, date =$2, location =$3, category = $4 WHERE event_id = $5",
      [name, date, location, category, id]
    );
    res.json(updateEvent);
  } catch (err) {
    console.log(err);
  }
});

// Delete an Event
app.delete("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEvent = await db.any("DELETE FROM events where event_id = $1", [
      id,
    ]);
    res.json("Your Event was deleted!"); //
  } catch (err) {
    console.log(err);
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(9000, () => {
  console.log("I am listening on Port 9000");
});

module.exports = app;
