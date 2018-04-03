import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import _ from 'underscore';
import $ from 'jquery';
import api from '../api'

function Editable(params) {
  // console.log("$$$$$$", params);

  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    params.dispatch(action);
  }

  function drop_task() {
    api.delete_task(params.task.id);
  }

  function open_edit_task() {
    let data = Object.assign({}, params.task);
    data['fid'] = params.task.id;
    let action1 = {
      type: "UPDATE_FORM",
      data: data,
    }
    params.dispatch(action1);

    let action = {
      type: "EDITING_TASK",
      editing: true,
    };
    params.dispatch(action);
  }

  function quit_edit() {
    let action = {
      type: "EDITING_TASK",
      editing: false,
    }
    params.dispatch(action);
  }

  function edit_task() {
    if (!params.form.assignee_id || !params.form.title || !params.form.description){
      alert("Form incomplete. Please try again.");
      return;
    }
    let data = {};
    data['assignee_id'] = params.form.assignee_id;
    data['title'] = params.form.title;
    data['description'] = params.form.description;
    data['id'] = params.form.fid;
    api.update_task(data);
    quit_edit();
  }

  function toDateTime(sec) {
    let curdate = new Date(null);
    curdate.setTime(sec*1000);
    return curdate.toLocaleString();
  }

  let task = params.task;
  // let id = params.task.id;
  let finish = (task.is_finish)?"Yes":"No";
  let end_time = (task.is_finish)?toDateTime(task.end_time):" - ";

  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  users.unshift(<option>please select</option>);
  // if (params.)
  return <div>
    <Card>
    <CardBody>
      <div style={{float:'left'}}>
        <p>Title      :       <b>{ task.title }</b></p>
        <p>Description: <b>{ task.description }</b></p>
        <p>Start  Time:  <b>{ toDateTime(task.start_time) }</b></p>
        <p>End    Time:   <b>{ end_time }</b></p>
        <p>Is   Finish:   <b>{ finish }</b></p>
        <p>Assigned to:   <b>{ task.assignee.name }</b></p>
      </div>
      <div style={{float:'right'}}>
        <Button onClick={ open_edit_task }>EDIT</Button>
        &nbsp;&nbsp;
        <Button onClick={ drop_task } color='danger'>DELETE</Button>
      </div>
    </CardBody>
  </Card>
  <div>
         <Modal isOpen={params.editing}>
         <ModalHeader>EDIT TASK</ModalHeader>
           <ModalBody>
             <FormGroup>
               <Label>Assignee</Label>
               <Input type="select" name="assignee_id" value={parseInt(params.form.assignee_id)} onChange={ update }>
                 { users }
               </Input>
             </FormGroup>

             <FormGroup>
               <Label for="title">Title</Label>
               <Input type="text" name="title" value={params.form.title} onChange={update} />
             </FormGroup>

             <FormGroup>
               <Label for="description">Description</Label>
               <Input type="textarea" name="description" value={params.form.description} onChange={update} />
             </FormGroup>
           </ModalBody>
           <ModalFooter>
             <Button color="primary" onClick={()=> edit_task() }>UPDATE</Button>{' '}
             <Button color="secondary" onClick={ quit_edit }>CLOSE</Button>
           </ModalFooter>
         </Modal>
       </div>
</div>;
}

function state2props(state) {
  // console.log("rerender login", state);
  return { editing: state.editing,
          form: state.form,
          token: state.token,
          users: state.users,
        };
}
// Export the result of a curried function call.
export default connect(state2props)(Editable);
