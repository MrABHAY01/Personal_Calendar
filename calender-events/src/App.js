import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import ThemePanel from './ThemePanel';

function App() {
  const [events, setEvents] = useState([]);
  const [theme, setTheme] = useState({
    backgroundColor: '#ffffff',
    color: '#000000',
    fontFamily: 'Arial, sans-serif',
  });

  const handleAddEvent = (eventData) => {
    setEvents((prevEvents) => [...prevEvents, eventData]);
  };

  const handleDeleteEvent = (date, eventId) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event) =>
        event.date === date
          ? { ...event, events: event.events.filter((e) => e.id !== eventId) }
          : event
      );
      return updatedEvents.filter((event) => event.events.length > 0);
    });
  };

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const handleColorChange = (property, value) => {
    setTheme((prevTheme) => ({ ...prevTheme, [property]: value }));
  };

  const handleFontChange = (property, value) => {
    setTheme((prevTheme) => ({ ...prevTheme, [property]: value }));
  };

  return (
    <div className="container-fluid">
      <div className="Heading_Name">
        <h3>
          <i className="far fa-smile" style={{ color: '#d06d11' }}></i> Personal Calendar
        </h3>
      </div>

      <div className="row">
        <div className="col-lg-6" style={{ backgroundColor: theme.backgroundColor, color: theme.color, fontFamily: theme.fontFamily }}>
          <div className="card event-form mt-5">
            <h2 className="card-header">Create Event</h2>
            <div className="card-body">
              <EventForm onAddEvent={handleAddEvent} />
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <Calendar events={events} onDeleteEvent={handleDeleteEvent} />
            </div>
          </div>
        </div>
        <div className="col-lg-6 bg-light p-4">
          <ThemePanel onThemeChange={handleThemeChange} onColorChange={handleColorChange} onFontChange={handleFontChange} />
        </div>
      </div>
    </div>
  );
}
//my name is abhay.
function EventForm({ onAddEvent }) {
  const [eventDate, setEventDate] = useState('');
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventOptions, setEventOptions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventData = {
      id: Date.now(),
      date: eventDate,
      events: [
        {
          name: eventName,
          startTime,
          endTime,
          location: eventLocation,
          options: eventOptions,
        },
      ],
    };

    onAddEvent(eventData);
    resetForm();
  };

  const resetForm = () => {
    setEventDate('');
    setEventName('');
    setStartTime('');
    setEndTime('');
    setEventLocation('');
    setEventOptions('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="eventDate" className="form-label">
          <i className="far fa-calendar-alt" style={{ color: '#bdbbb7' }}></i> Date:
        </label>
        <input
          type="date"
          id="eventDate"
          className="form-control"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="eventName" className="form-label">
          Event Name:
        </label>
        <input
          type="text"
          id="eventName"
          className="form-control"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="startTime" className="form-label">
          Start Time:
        </label>
        <input
          type="time"
          id="startTime"
          className="form-control"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="endTime" className="form-label">
          End Time:
        </label>
        <input
          type="time"
          id="endTime"
          className="form-control"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="eventLocation" className="form-label">
          <i className="fas fa-map-marker-alt" style={{ color: '#afb1b6' }}></i> Event Location:
        </label>
        <input
          type="text"
          id="eventLocation"
          className="form-control"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="eventOptions" className="form-label">
          Event Options:
        </label>
        <textarea
          id="eventOptions"
          className="form-control"
          value={eventOptions}
          onChange={(e) => setEventOptions(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Create Event
      </button>
    </form>
  );
}

function Calendar({ events, onDeleteEvent }) {
  return (
    <div className="dates">
      {events.map((event) => (
        <div key={event.date} className="date">
          <h5 className="date-label">{event.date}</h5>
          <ul className="list-group">
            {event.events.map((eventData) => (
              <li key={eventData.id} className="list-group-item">
                <strong>{eventData.name}</strong>
                <p>
                  {eventData.startTime} - {eventData.endTime}
                </p>
                <p>Location: {eventData.location}</p>
                <p>Options: {eventData.options}</p>
                <button
                  onClick={() => onDeleteEvent(event.date, eventData.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
