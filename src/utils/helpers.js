export function isPastAppointment(date) {
  const appointmentDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return appointmentDate < today;
}
export function formatDateDDMMYYYY(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}


export function groupAppointmentsByMonth(appointments) {
  const grouped = {};
  appointments.forEach((appointment) => {
    const month = new Date(appointment.date).toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
    if (!grouped[month]) {
      grouped[month] = [];
    }
    grouped[month].push(appointment);
  });
  return grouped;
}

export function sortAppointments(appointments) {
  return [...appointments].sort((a, b) => {
    if (a.allDay && !b.allDay) return -1;
    if (!a.allDay && b.allDay) return 1;
    return (
      new Date(a.date) - new Date(b.date) ||
      a.startTime?.localeCompare(b.startTime)
    );
  });
}

