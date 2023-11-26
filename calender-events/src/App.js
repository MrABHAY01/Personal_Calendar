import React, { useState, useEffect  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import ThemePanel from './ThemePanel';
import moment from 'moment-timezone';


function App() {
  // State to manage events and theme
  const [events, setEvents] = useState([]);
  const [theme, setTheme] = useState({
    backgroundColor: '#ffffff',
    color: '#000000',
    fontFamily: 'Arial, sans-serif',
  });

  // Function to handle adding an event
  const handleAddEvent = (eventData) => {
    setEvents((prevEvents) => [...prevEvents, eventData]);
  };

  // Function to handle deleting an event
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

   // Function to handle theme change
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

    // Function to handle color change in the theme
  const handleColorChange = (property, value) => {
    setTheme((prevTheme) => ({ ...prevTheme, [property]: value }));
  };

   // Function to handle font change in the theme
  const handleFontChange = (property, value) => {
    setTheme((prevTheme) => ({ ...prevTheme, [property]: value }));
  };

  return (
    <div className="container-fluid" id='Main-Contents'>
      <div className="Heading_Name">
        <h3>
          <i className="far fa-smile" style={{ color: '#d06d11' }}></i> Personal Calendar
        </h3>
      </div>

      <div className="row">
        <div className="col-lg-6" id='  ' style={{ backgroundColor: theme.backgroundColor, color: theme.color, fontFamily: theme.fontFamily,borderTopLeftRadius: '25px', borderTopRightRadius: '25px',marginLeft:'3%',marginTop:'3%' }}>
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
        <div className="col-lg-5  p-4" id='Theme-Back'>
          <ThemePanel onThemeChange={handleThemeChange} onColorChange={handleColorChange} onFontChange={handleFontChange} />
        </div>
      </div>
    </div>
  );
}

// Component for the form to create events
function EventForm({ onAddEvent }) {
  const [eventDate, setEventDate] = useState('');
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventOptions, setEventOptions] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [isFree, setIsFree] = useState(true); 
  const [requireApproval, setRequireApproval] = useState(false);
  const [capacity, setCapacity] = useState('');
  const [visibility, setVisibility] = useState('public'); 
  const [timeZoneOptions, setTimeZoneOptions] = useState([]);

  useEffect(() => {
    const zones = moment.tz.names();
    setTimeZoneOptions(zones);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const eventData = {
      id: Date.now(),
      date: moment(eventDate).format("YYYY-MM-DD"),
      events: [
        {
          name: eventName,
          startTime: moment.tz(`${eventDate} ${startTime}`, 'YYYY-MM-DD HH:mm', timeZone).format(),
          endTime: moment.tz(`${eventDate} ${endTime}`, 'YYYY-MM-DD HH:mm', timeZone).format(),
          location: eventLocation,
          options: eventOptions,
          timeZone,
          isFree,
          requireApproval,
          capacity,
          visibility,
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
    setTimeZone('');
    setIsFree(true);
    setRequireApproval(false);
    setCapacity('');
    setVisibility('public');
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
          onChange={(e) => setEventDate(moment(e.target.value, "YYYY-MM-DD").format("YYYY-MM-DD"))}
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
        <label htmlFor="timeZone" className="form-label">
          Time Zone:
        </label>
        <select
          id="timeZone"
          className="form-select"
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value)}
        >
          <option value="" disabled>
            Select Time Zone
          </option>
          {timeZoneOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      

      <div className="mb-3">
        <label htmlFor="eventOptions" className="form-label">
          Event Options:
        </label>
        <div className="mb-3">
    <label htmlFor="isFree" className="form-label">
      Ticket: 
    </label>
    <div className="form-check form-check-inline">
      <input
        type="radio"
        id="freeTicket"
        className="form-check-input"
        value="free"
        checked={isFree}
        onChange={() => setIsFree(true)}
      />
      <label className="form-check-label" htmlFor="freeTicket">Free</label>
    </div>
    <div className="form-check form-check-inline">
      <input
        type="radio"
        id="paidTicket"
        className="form-check-input"
        value="paid"
        checked={!isFree}
        onChange={() => setIsFree(false)}
      />
      <label className="form-check-label" htmlFor="paidTicket">Paid</label>
    </div>
  </div>

  <div className="mb-3">
    <label htmlFor="requireApproval" className="form-label">
      Require Approval:
    </label>
    <div className="form-check form-switch">
      <input
        type="checkbox"
        id="requireApproval"
        className="form-check-input"
        checked={requireApproval}
        onChange={() => setRequireApproval(!requireApproval)}
      />
    </div>
  </div>

  <div className="mb-3">
    <label htmlFor="capacity" className="form-label">
      Capacity:
    </label>
    <input
      type="number"
      id="capacity"
      className="form-control"
      value={capacity}
      onChange={(e) => setCapacity(e.target.value)}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="visibility" className="form-label">
      Visibility:
    </label>
    <select
      id="visibility"
      className="form-select"
      value={visibility}
      onChange={(e) => setVisibility(e.target.value)}
    >
      <option value="public">Public</option>
      <option value="private">Private</option>
    </select>
  </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Create Event
      </button>
    </form>
  );
}

// Component to display the calendar and event
function Calendar({ events, onDeleteEvent }) {
  return (
    <div className="dates">
      {events.map((event) => (
        <div key={event.date} className="date">
          <h5 className="date-label">{moment(event.date).format('MMMM D, YYYY')}</h5>
          <ul className="list-group">
            {event.events.map((eventData) => (
              <li key={eventData.id} className="list-group-item">
                <div className="event-details">
                  <strong>{eventData.name}</strong>
                  <p>__________________</p>
                  <p>
                    {moment(eventData.startTime).format('LT')} - {moment(eventData.endTime).format('LT')}
                  </p>
                  <p>Time Zone: {eventData.timeZone}</p>
                  <p>Location: {eventData.location}</p>
                  <p>{eventData.options}</p>
                  <p>Ticket: {eventData.isFree ? 'Free' : 'Paid'}</p>
                  <p>Require Approval: {eventData.requireApproval ? 'Yes' : 'No'}</p>
                  <p>Capacity: {eventData.capacity}</p>
                  <p>Visibility: {eventData.visibility}</p>
                  
                </div>
                <div className="invitation">
                <p>You are<br />invited!<br /><i className="far fa-smile" style={{ color: '#black' }}></i></p>
                  <button
                    onClick={() => onDeleteEvent(event.date, eventData.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}


export default App;