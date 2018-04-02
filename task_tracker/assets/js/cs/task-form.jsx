import $ from "jquery";
import _ from "underscore"
import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import api from '../api';

function TaskForm(params) {

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

  function formIsFilled() {
    return params.form.assignee_id!="" && params.form.title!="" && params.form.description!="";
  }

  function submit(ev) {
    if (formIsFilled()) {
      let form = Object.assign({}, params.form);
      let currentdate = new Date();
      form['assignee_id'] = parseInt(params.form.assignee_id);
      form['start_time'] = Math.floor(currentdate.getTime()/1000);
      form['end_time'] = 0;
      form['creator_id'] = params.token.user_id;
      api.submit_task(form);
      let action2 = {
        type: 'CLEAR_FORM',
        data: {},
      }
      params.dispatch(action2);
    }
    else {
      let data = {};
      data['message'] = "form is incomplete."
      let action = {
        type: 'UPDATE_FORM',
        data: data,
      };
      params.dispatch(action);
    }

  }

  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);

  return <div style={ {padding: "4ex"} }>
    <h2>New Task</h2>
    <FormGroup>
      <Label>Assignee</Label>
      <Input type="select" name="assignee_id" value={parseInt(params.form.assignee_id)} onChange={update}>
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

    <div>
      <Button onClick={submit}>CREATE</Button> &nbsp;&nbsp;
      <Link to="/login"><Button>BACK</Button></Link><br/>
      <span style={{color:'red'}}>{ params.form.message}</span>
    </div>

  </div>;
}

function state2props(state) {
  return { form: state.form,
            token: state.token,
  };
}

// Export the result of a curried function call.
export default connect(state2props)(TaskForm);
