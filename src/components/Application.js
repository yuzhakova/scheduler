import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import InterviewerList from "./InterviewerList";
import Appointment from "components/Appointment";
import axios from 'axios';

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "4pm",
    interview: {
      student: "Eren Jaeger",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "5pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "12am",
  }
];

const appointment = appointments.map((appt) => {

  return (
      <Appointment key={appt.id} {...appt} />
    )
});

export default function Application(props) {
  const [day, setDay] = useState([]);
  const [dayData, setDayData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8001/api/days')
      .then(res => {
        setDayData(res.data)
      })
      .catch(err => console.log(err))
  }, [])

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
          days={dayData}
          day={day}
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