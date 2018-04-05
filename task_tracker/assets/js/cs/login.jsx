import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import $ from "jquery";
import _ from "underscore"
import api from "../api"

function Login(params) {

  function update(ev) {
    let t = $(ev.target);
    let data = {};
    data[t.attr('name')] = t.val();
    let action = {
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    };
    params.dispatch(action);
  }

  function isLoginSuccess() {
    let valid = "";
    if (isUserValid()=="success" && isPwdValid()=="success")
      valid = "success";
    else if (isUserValid()!="success") {
      valid = isUserValid();
    }
    else if (isPwdValid()!="success") {
      valid = isPwdValid();
    }

    return valid;
  }
  function isUserValid() {
    let valid = "success";
    let flag = false;
    console.log("params.users", params.users);
     _.each(params.users, (uu)=>{
      flag = flag || $('.input-email').val()==uu.email;
    });
    if (!flag) valid = "Email doesn't exist.";
    return valid;
  }

  function isPwdValid(){
    let valid = "success";
    if (!params.token) {
      valid = "wrong pass word. please enter again.";
    }
    return valid;
  }

  function submit() {
    api.submit_login(params.login);
    op();
    //setInterval(function(){op();console.log("hehehheh")}, 1000);
  }

  function op() {
    if (isLoginSuccess()=="success") {
      return <Redirect to="/users" push={true}/>;

    }
    else {
      let data = {};
      data['message'] = isLoginSuccess();
      let action = {
        type: 'UPDATE_LOGIN_FORM',
        data: data,
      }
      params.dispatch(action);
    }
  }

  function logout() {
    let data = {};
    data['token'] = "";
    let action = {
      type: 'DROP_TOKEN',
      data: data,
    }
    params.dispatch(action);
  }

  if (!params.token){
    return (
      <div style={ {padding: "4ex"} }>
        <div className="jumbotron">
        <h2 style={{fontFamily: "cursive", color:"red", marginDown:20, }}>ReduxTracker</h2>
        <FormGroup>
          <Label for="email">EMAIL</Label>
          <Input type="text" className="input-email" name="email" value={params.login.email} onChange={update}/>
        </FormGroup>

        <FormGroup>
          <Label for="password">PASSWORD</Label>
          <Input type="password" name="password" value={params.login.password} onChange={update} />
          <span style={{color:'red'}}>{ params.login.message }</span>
        </FormGroup>


        <Button onClick={submit} color="warning">LOGIN</Button>
        &nbsp; &nbsp;
        <Link to="/register"><Button>NEW</Button></Link>
        </div>
      </div>
    );
  }
  else {
    return (
      <div style={ {padding: "4ex"} }>
        <div className="jumbotron">
          <h3>WELCOME:{"  "}{ params.token.user_name }</h3>
          <Link to='/'><Button style={{fontFamily: "monospace"}} >CREATE TASKS</Button></Link>&nbsp;&nbsp;
          <Link to={"/users/"+params.token.user_id}><Button style={{fontFamily: "monospace"}} >SHOW TASKS</Button></Link>&nbsp;&nbsp;
          <Link to='/users'><Button style={{fontFamily: "monospace"}} >VIEW USERS</Button></Link>&nbsp;&nbsp;
          <Link to='/login'><Button style={{fontFamily: "monospace"}} onClick={logout} >LOGOUT</Button></Link>
        </div>
      </div>
    );
  }
}

function state2props(state) {
  return { login: state.login,
          token: state.token
        };
}

// Export the result of a curried function call.
export default connect(state2props)(Login);
