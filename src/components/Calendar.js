import React, { useState } from 'react';

function Calendar({ appointments }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const rawFirstDay = new Date(currentYear, currentMonth, 1).getDay();
  const firstDayOfMonth = (rawFirstDay + 6) % 7;

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthName = new Date(currentYear, currentMonth).toLocaleString(
    'default',
    {
      month: 'long',
      year: 'numeric',
    }
  );

  const getDayAppointments = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      '0'
    )}-${String(day).padStart(2, '0')}`;
    return appointments.filter((app) => app.date === dateStr);
  };

  return (
    <div className="calendar">
      <h3>{monthName}</h3>
      <div className="calendar-nav">
        <button onClick={prevMonth}>Previous</button>
        <button onClick={nextMonth}>Next</button>
      </div>
      <div className="calendar-grid">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day} className="calendar-header">
            {day}
          </div>
        ))}
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`} className="calendar-day empty"></div>
          ))}
        {Array(daysInMonth)
          .fill(null)
          .map((_, i) => {
            const day = i + 1;
            const dayAppointments = getDayAppointments(day);
            const hasAppointments = dayAppointments.length > 0;

            return (
              <div
                key={day}
                className={`calendar-day ${
                  hasAppointments ? 'has-appointments' : ''
                }`}
                onClick={() => {
                  if (hasAppointments) {
                    const details = dayAppointments
                      .map(
                        (app) =>
                          `Description: ${app.description}\nTime: ${
                            app.allDay
                              ? 'All Day'
                              : `${app.startTime} - ${app.endTime}`
                          }\nLocation: ${app.location || 'N/A'}`
                      )
                      .join('\n\n');
                    alert(
                      `Appointments on ${day}/${
                        currentMonth + 1
                      }/${currentYear}:\n\n${details}`
                    );
                  }
                }}
              >
                {day}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Calendar;
