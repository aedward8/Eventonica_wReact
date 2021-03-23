import React, { useState } from "react";

const InputEvent = () => {
  const [eventName, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [category, setCategory] = React.useState("");
  return (
    <>
      <h1>Add an Event Here!</h1>
      <form
        onSubmit={async (e) => {
          // prevents refresh
          e.preventDefault();
          console.log({ eventName, date, location, category });
          try {
            const body = { eventName, date, location, category };
            const response = await fetch("http://localhost:9000/events", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
          } catch (err) {
            console.log(err);
          }
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
    </>
  );
};

export default InputEvent;
