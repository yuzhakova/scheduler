import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';
import { action } from '@storybook/addon-actions/dist/preview';

export default function Form(props) {

  //For keeping track of the name
  const [currentName, setName] = useState(props.name || "");
  const [currentInterviewer, setInterviewer] = useState(props.value || null)

  //Helper function to clear all fields
  const reset = () => {
    setName("")
    setInterviewer('null')
  }

  function cancel () {
    // props.onCancel;
    reset();
    props.onCancel()
  }
  console.log(props)

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"        
            onChange={(event) => setName(event.target.value)}            
            value={currentName}
            placeholder={currentName ? currentName : "Please enter your name"}

            /*
              This must be a controlled component
            */
          />

        </form>
        <InterviewerList interviewers={props.interviewers} value={currentInterviewer} onChange={(event) => setInterviewer(event)} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onSubmit={event => event.preventDefault()} onClick={event => props.onSave(currentName, currentInterviewer)}>Save</Button>
        </section>
      </section>
    </main>
  )
}