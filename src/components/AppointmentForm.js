
import React, { useState, useEffect } from 'react';

function AppointmentForm({ onAddAppointment, editingAppointment, onEditAppointment }) {
  const [formData, setFormData] = useState({
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    allDay: false,
    location: '',
  });

  useEffect(() => {
    if (editingAppointment) {
      setFormData(editingAppointment);
    }
  }, [editingAppointment]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.description ||
      !formData.date ||
      (!formData.allDay && (!formData.startTime || !formData.endTime))
    ) {
      alert('Please fill in the mandatory fields.');
      return;
    }

    if (editingAppointment) {
      onEditAppointment(formData);
    } else {
      onAddAppointment(formData);
    }

    setFormData({
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      allDay: false,
      location: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      

       <h2>{editingAppointment ? 'Edit Appointment' : 'Add Appointment'}</h2>

      <div className="form-group">
        <label htmlFor="description">Description (mandatory):</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date (mandatory):</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Time:</label>
        <input
          type="time"
          id="start-time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          disabled={formData.allDay}
        />
        <input
          type="time"
          id="end-time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          disabled={formData.allDay}
        />
        <label>
          All Day
          <input
            type="checkbox"
            id="all-day"
            name="allDay"
            checked={formData.allDay}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="location">Location (optional):</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      
<button type="submit">
        {editingAppointment ? 'Update Appointment' : 'Add Appointment'}
      </button>

    </form>
  );
}

export default AppointmentForm;
