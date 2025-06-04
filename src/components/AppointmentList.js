import React from 'react';
import { isPastAppointment, groupAppointmentsByMonth, sortAppointments } from '../utils/helpers';
import MonthSection from './MonthSection';

function AppointmentList({ appointments, showPast, onEdit, onDelete }) {
  const sortedAppointments = sortAppointments(appointments);
  
  const futureAppointments = sortedAppointments.filter(
    app => !isPastAppointment(app.date)
  );
  const pastAppointments = sortedAppointments.filter(
    app => isPastAppointment(app.date)
  );

  const groupedFuture = groupAppointmentsByMonth(
    futureAppointments.map(app => ({
      ...app,
      globalIndex: appointments.indexOf(app),
    }))
  );
  
  const groupedPast = groupAppointmentsByMonth(
    pastAppointments.map(app => ({
      ...app,
      globalIndex: appointments.indexOf(app),
    }))
  );
  

  return (
    <div className="appointments-container">
      {Object.entries(groupedFuture).map(([month, monthAppointments]) => (
        <MonthSection
          key={`future-${month}`}
          month={month}
          appointments={monthAppointments}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

      {showPast && Object.entries(groupedPast).map(([month, monthAppointments]) => (
        <MonthSection
          key={`past-${month}`}
          month={month}
          appointments={monthAppointments}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default AppointmentList;