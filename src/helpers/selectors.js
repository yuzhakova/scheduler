//Go through an appointments object and return an array pf all the nested objects with that id
const matchAppointments = (appointments, ids) => {
  const matched = ids.map(id => appointments[id]);
  return matched;
}

//Go through a state array with a days object and an appointments object
//Match the appointments given in the days object to those in the appointments object
function getAppointmentsForDay(state, day) {
  let appointmentArr = [];
  state.days.map(dayObject => {
    if (dayObject.name === day) {
      dayObject.appointments.forEach(apptId => appointmentArr.push(apptId))
    }
  })
  return matchAppointments(state.appointments, appointmentArr);
}

module.exports = { matchAppointments, getAppointmentsForDay };