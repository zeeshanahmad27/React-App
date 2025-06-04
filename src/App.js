import React, { useState, useEffect } from 'react';
import './styles/App.css';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import Calendar from './components/Calendar';

function App() {
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : [];
  });

  const [showPast, setShowPast] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // NEW
  const [editingAppointment, setEditingAppointment] = useState(null); // NEW

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);
  };

  const startEditing = (index, appointment) => {
    setEditingIndex(index);
    setEditingAppointment(appointment);
  };

  const applyEdit = (updatedAppointment) => {
    const updatedAppointments = [...appointments];
    updatedAppointments[editingIndex] = updatedAppointment;
    setAppointments(updatedAppointments);
    setEditingIndex(null);
    setEditingAppointment(null);
  };

  const deleteAppointment = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
  };

  return (
    <div className="container">
      <h1>Appointment Manager</h1>
      <AppointmentForm
        onAddAppointment={addAppointment}
        editingAppointment={editingAppointment}
        onEditAppointment={applyEdit}
      />
      <button onClick={() => setShowPast(!showPast)} className="toggle-button">
        {showPast ? 'Hide Past Appointments' : 'Show Past Appointments'}
      </button>
      <Calendar appointments={appointments} />
      <AppointmentList
        appointments={appointments}
        showPast={showPast}
        onEdit={startEditing}
        onDelete={deleteAppointment}
      />
    </div>
  );
}

export default App;
