import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

let allEvents = [
  {
    event_id: 1,
    name: "Birthday",
    date: "2021-03-05",
    location: "Downtown",
    category: "fun",
  },
  {
    event_id: 2,
    name: "Puppy Adoption Fair",
    date: "2021-02-01",
    location: "Golden Gate Park",
    category: "fun",
  },
  {
    event_id: 3,
    name: "Study-A-Thon",
    date: "2021-02-21",
    location: "Virtual",
    category: "Learning",
  },
];

//import
// getEvents = () => {
//   return allEvents
// }

function EventSection() {
  //fetch all event data
  let eventsInitial = allEvents;
  const [eventList, setEventList] = useState(eventsInitial);

  return (
    <div>
      <h1>Hello, I am the Event's Section</h1>
      <EventList a={eventList} b={setEventList} />
      <EventForm />
    </div>
  );
}

function EventList(props) {
  //
  let deleteEvent = (eventId) => {
    let newEventList = props.a.filter((event) => {
      return event.event_id !== eventId;
    });

    props.b(newEventList);
  };

  return (
    <ul>
      {props.a.map((event) => {
        return (
          <li key={event.event_id}>
            <Event event={event} deleteEvent={deleteEvent} />
          </li>
        );
      })}
    </ul>
  );
}

function Event(props) {
  return (
    <p>
      {props.event.name}{" "}
      <button
        onClick={() => {
          props.deleteEvent(props.event.event_id);
        }}
      >
        Delete Me
      </button>
    </p>
  );
}

function EventForm() {
  const [eventName, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [category, setCategory] = React.useState("");

  return (
    <div>
      <h1>Add an Event Here!</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log({ eventName, date, location });
          // , description, numAttendees, eventDate
          // call eventonica.createEvent with these variables
        }}
      >
        {/* event name input */}
        <div style={{ paddingBottom: "20px" }}>
          <label>
            Event Name:{" "}
            <input
              type="text"
              name="event name"
              value={eventName}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
        </div>
        {/* event date input */}
        <div style={{ paddingBottom: "20px" }}>
          <label>
            Date:{" "}
            <input
              type="date"
              name="event name"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </label>
        </div>
        {/* event location input */}
        <div style={{ paddingBottom: "20px" }}>
          <label>
            Location:{" "}
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </label>
        </div>
        {/* event category input */}
        <div style={{ paddingBottom: "20px" }}>
          <label>
            Category:{" "}
            <input
              type="text"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
          </label>
        </div>
        <div style={{ paddingBottom: "20px" }}>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

function App() {
  const [apiResponse, setApiResponse] = React.useState("");

  // let callAPI = () => {
  //   fetch("http://localhost:9000/testAPI")
  //     .then((res) => res.text())
  //     .then((res) => setApiResponse(res));
  // };

  let allEvents = () => {
    fetch("http://localhost:9000/events")
      .then((res) => res.text())
      .then((res) => setApiResponse(res));
  };
  React.useEffect(() => {
    // Anything in here is fired on component mount.
    //callAPI();
    allEvents();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <p className="App-intro">{apiResponse}</p>
      <EventSection />
    </div>
  );
}

export default App;
