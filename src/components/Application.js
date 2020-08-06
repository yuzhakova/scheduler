import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import InterviewerList from "./InterviewerList";
import Appointment from "components/Appointment";
import axios from 'axios';
import { matchAppointments, getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  const setDay = day => setState({...state, day});
  // const setDays = days => setState(prev => ({ ...prev, days }));
    // const setDays = days => setState(prev => {
    //   console.log(prev);
    //   return ({ ...prev, days })
    // });


  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('http://localhost:8001/api/days')),
      Promise.resolve(axios.get('http://localhost:8001/api/appointments'))
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}));
    })
  }, [])

  const appointmentObjects = getAppointmentsForDay(state, state.day)

  const appointment = appointmentObjects.map((appointmentObject) => {
    return (
        <Appointment key={appointmentObject.id} {...appointmentObject} />
      )
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointment}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}