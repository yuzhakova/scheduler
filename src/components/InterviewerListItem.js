import React from 'react';
import 'components/InterviewerListItem.scss'
const classNames = require('classnames');

/*  InterviewerListItem component takes in the following props:
id:number - the id of the interviewer
name:string - the name of the interviewer
avatar:url - a url to an image of the interviewer
selected:boolean - to determine if an interview is selected or not
setInterviewer:function - sets the interviewer upon selection
*/

export default function InterviewerListItem(props) {
  let interviewerStyles = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  })

  let imageStyles = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected,
  })

  return (
    <li 
      className={interviewerStyles}
      onClick={props.setInterviewer}
    >
      <img
        className={imageStyles}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}