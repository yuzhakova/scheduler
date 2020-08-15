import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';
  // eslint-disable-next-line
import { action } from '@storybook/addon-actions/dist/preview';

export default function Form(props) {

  //For keeping track of the name
  const [currentName, setName] = useState(props.name || "");
  const [currentInterviewer, setInterviewer] = useState(props.value || null)
  const [error, setError] = useState("");

  //Helper function to clear all fields
  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  function cancel () {
    // props.onCancel;
    reset();
    props.onCancel()
  }

  function validate() {
    if (currentName === "") {
      setError("Student name cannot be blank")
      return;
    }
    setError("")
    props.onSave(currentName, currentInterviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"        
            onChange={(event) => setName(event.target.value)}            
            value={currentName}
            placeholder="Enter Student Name"
            // placeholder={currentName ? currentName : "Enter Student Name"}
            data-testid="student-name-input"
            /*
              This must be a controlled component
            */
          />
        <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={props.interviewers} value={currentInterviewer} onChange={(event) => setInterviewer(event)} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onSubmit={event => event.preventDefault()} onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}