import { useState } from "react";

import "./App.css";

const formatDate = (date) => {
  try {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return [year, month, day].join("-");
  } catch (error) {
    console.error("Error formating the date", error);
  }
};

const TODAY = formatDate(new Date());
const DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000;

function App() {
  const [selectedFlight, setSelectedFlight] = useState("one-way");
  const [departureDate, setDepartureDate] = useState(
    formatDate(new Date(Date.now() + DAY_IN_MILISECONDS))
  );
  const [returnDate, setReturnDate] = useState(departureDate);
  const [error, setError] = useState("");

  const handleBooking = (e) => {
    e.preventDefault();
    setError("");
    if (!departureDate || departureDate < TODAY) {
      setError(`Departure date cannot be empty or earlier than today.`);
      return;
    }
    if (!returnDate) {
      setError(`Please add a ${returnDate}.`);
      return;
    }
    if (selectedFlight === "return" && returnDate < departureDate) {
      setError("Return date cannot be earlier than the departure date.");
      return;
    }
    if (selectedFlight === "one-way") alert("You have booked a one-way flight");
    if (selectedFlight === "return") alert("You have booked a return flight");
  };

  return (
    <div className="App">
      <form className="flight-booker-form">
        <label htmlFor="flight-dropdown">Choose the flight</label>
        <select
          name="flight"
          id="flight-dropdown"
          className="flight-select"
          value={selectedFlight}
          onChange={(e) => setSelectedFlight(e.target.value)}
        >
          <option value="one-way">One-way flight</option>
          <option value="return">Return flight</option>
        </select>
        <input
          type="date"
          className="date-input"
          name="departure-date"
          value={departureDate}
          min={TODAY}
          onChange={(e) => {
            setDepartureDate(e.target.value);
          }}
        />
        <input
          type="date"
          className="date-input"
          name="return-date"
          value={returnDate}
          hidden={selectedFlight !== "return"}
          onChange={(e) => {
            setReturnDate(e.target.value);
          }}
        />
        <button
          className="submit-btn"
          type="submit"
          onClick={(e) => handleBooking(e)}
        >
          Book
        </button>
        <p>{error}</p>
      </form>
    </div>
  );
}

export default App;
