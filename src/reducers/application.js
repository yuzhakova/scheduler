export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const SET_INTERVIEW_DAYS = "SET_INTERVIEW_DAYS";

function getSpotsForDay(state, day) {
  return state.days
    .find(d => d.name === day)
    .appointments.reduce((a, c) => {
      return state.appointments[c].interview ? a : a + 1;
    }, 0);
}

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    case SET_INTERVIEW_DAYS: {
      return {
        ...state,
        days: action.days,
        appointments: action.appointments
      };
    }
    case SET_INTERVIEW: {
      const newState = {
        ...state,
        appointments: {
          ...state.appointments,
          [action.id]: {
            ...state.appointments[action.id],
            interview: action.interview
          }
        }
      };
      return {
        ...newState,
        days: state.days.map(day => ({
          ...day,
          spots: getSpotsForDay(newState, day.name)
        }))
      };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}