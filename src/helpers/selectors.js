//Go through an appointments object and return an array pf all the nested objects with that id
const matchIds = (appointments, ids) => {
  const matched = ids.map(id => appointments[id]);
  return matched;
}

//Go through a state array with a days object and an appointments object
//Match the appointments given in the days object to those in the appointments object
function getAppointmentsForDay(state, day) {

  let appointmentArr = [];
  // eslint-disable-next-line
  state.days.map(dayObject => {
    if (dayObject.name === day) {
      dayObject.appointments.forEach(apptId => appointmentArr.push(apptId))
    }
  })
  return matchIds(state.appointments, appointmentArr);
}

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerInfo = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerInfo
  }
}

function getInterviewersForDay(state, day) {

  let interviewersArr = [];
  // eslint-disable-next-line
  state.days.map(dayObject => {
    if (dayObject.name === day) {
      dayObject.interviewers.forEach(interviewerId => interviewersArr.push(interviewerId))
    }
  })
  return matchIds(state.interviewers, interviewersArr);
}

module.exports = { matchIds, getAppointmentsForDay, getInterview, getInterviewersForDay };