import React from 'react';
import { formatDateDDMMYYYY } from '../utils/helpers';


function MonthSection({ month, appointments, onEdit, onDelete }) {
  return (
    <div className="month-section">
      <h3 className="month-header">{month}</h3>
      {appointments.map((appointment, index) => (
        <div key={index} className="appointment">
          <p>
            <strong>Description:</strong> {appointment.description}
          </p>
          <p>
          <strong>Date:</strong> {formatDateDDMMYYYY(appointment.date)}

          </p>
          <p>
            <strong>Time:</strong>{' '}
            {appointment.allDay
              ? 'All Day'
              : `${appointment.startTime} - ${appointment.endTime}`}
          </p>
          {appointment.location && (
            <p>
              <strong>Location:</strong> {appointment.location}
            </p>
          )}
          <div className="appointment-actions">
          <button className="edit" onClick={() => onEdit(appointment.globalIndex, appointment)}>
  Edit
</button>
<button className="delete" onClick={() => onDelete(appointment.globalIndex)}>
  Delete
</button>

          </div>
        </div>
      ))}
    </div>
  );
}

export default MonthSection;
