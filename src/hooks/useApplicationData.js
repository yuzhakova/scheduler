import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData(props) {
  
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day: day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });
  }, []);

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(r =>
      // Promise.all([
      //   axios.get("/api/appointments"),
      //   axios.get("/api/days")
      // ]).then(all => {
      //   dispatch({
      //     type: SET_INTERVIEW_DAYS,
      //     appointments: all[0].data,
      //     days: all[1].data
      //   });
      // })
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview
      })
    );
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(r =>
      // Promise.all([
      //   axios.get("/api/appointments"),
      //   axios.get("/api/days")
      // ]).then(all => {
      //   dispatch({
      //     type: SET_INTERVIEW_DAYS,
      //     appointments: all[0].data,
      //     days: all[1].data
      //   });
      // })
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview: null
      })
    );
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}