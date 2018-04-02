import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from '../api'

export default function Task(params) {

  function finish_task() {
    let curdate = new Date();
    let sec = Math.floor(curdate.getTime()/1000);
    let data = Object.assign({}, params.task);
    data['end_time'] = sec;
    data['is_finish'] = true;
    api.finish_task(data);
  }

  function toDateTime(sec) {
    var curdate = new Date(null);
    curdate.setTime(sec*1000);
    return curdate.toLocaleString();
  }

  let task = params.task;
  let finish = (task.is_finish)?"Yes":"No";
  let end_time = (task.is_finish)?toDateTime(task.end_time):" - ";


  if (params.task.is_finish) {
    return <Card>
      <CardBody>
        <div style={{float:'left'}}>
          <p>Assigned By:       <b>{ task.creator.name }</b></p>
          <p>Title      :       <b>{ task.title }</b></p>
          <p>Description: <b>{ task.description }</b></p>
          <p>Start  Time:  <b>{ toDateTime(task.start_time) }</b></p>
          <p>End    Time:   <b>{ end_time }</b></p>
          <p>Is   Finish:   <b>{ finish }</b></p>
        </div>
      </CardBody>
    </Card>;
  }
  else {
    return <Card>
      <CardBody>
        <div style={{float:'left'}}>
          <p>Assigned By:       <b>{ task.creator.name }</b></p>
          <p>Title      :       <b>{ task.title }</b></p>
          <p>Description: <b>{ task.description }</b></p>
          <p>Start  Time:  <b>{ toDateTime(task.start_time) }</b></p>
          <p>End    Time:   <b>{ end_time }</b></p>
          <p>Is   Finish:   <b>{ finish }</b></p>
        </div>
        <div style={{float:'right'}}>
          <Button onClick={ finish_task }>FINISH</Button>
        </div>
      </CardBody>
    </Card>;
  }

}
