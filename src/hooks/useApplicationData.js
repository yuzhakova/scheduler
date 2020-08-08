import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  function setDay(day) {
    setState({...state, day})
  }

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('http://localhost:8001/api/days')),
      Promise.resolve(axios.get('http://localhost:8001/api/appointments')),
      Promise.resolve(axios.get('http://localhost:8001/api/interviewers'))
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview:interview})
    .then(res => {
        setState({...state, appointments})
        return res
      })
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(res => {
      setState({...state, appointments})
      return res
    })
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
   } 
}