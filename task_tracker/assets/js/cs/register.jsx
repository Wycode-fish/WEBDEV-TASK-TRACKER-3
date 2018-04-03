import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import $ from "jquery";
import _ from "underscore"
import api from "../api"

// let Message = connect(({message}) => {return {message};})((props) => {
//   return <span style={{color:'red'}}>{ params.register.message }</span>;
// });

function Register(params) {

  let mess = "";

  function update(ev) {
    let t = $(ev.target);
    let data = {};
    data[t.attr('name')] = t.val();
    let action = {
      type: 'UPDATE_REGISTER_FORM',
      data: data,
    };
    params.dispatch(action);
  }

  function submit() {
    //console.log("7&&&&&&&", params.register);
    let valid = isAccountValid();

    if (valid=="success") {
      api.submit_register(params.register);
      return <Redirect to="/login" push={true}/>
    }
    else {
      let data = {};
      data["message"] = valid;
      let action = {
        type: 'UPDATE_REGISTER_FORM',
        data: data,
      };
      params.dispatch(action);
    }
  }

  function isAccountValid() {
    if(isEmailValid()=="success" && isPwValid()=="success")
      return "success";
    else if (isEmailValid()!="success") return isEmailValid();
    else return isPwValid();
  }

  function isEmailValid() {
    let valid = "success";
    let flag = true;
     _.each(params.users, (uu)=>{
      flag = flag && $('.register-email').val()!=uu.email;
    });
    if (!flag) valid="Email has existed.";
    return valid;
  }

  function isPwValid() {
    let valid = "success";

    let isPwMatch = $('.pwd').val()==$('.repwd').val();
    if (!isPwMatch) return "password don't match."
    let isPwLong = $('.pwd').val().length>=7;
    if (!isPwLong) return "password's lenth should be no less than 7.";

    return valid;
  }

  //let message = "";

  return (
    <div className="jumbotron" style={ {padding: "4ex"} }>
      <h2 style={{fontFamily: "cursive"}}>NEW USER</h2>
      <FormGroup>
        <Label for="email">EMAIL</Label>
        <Input type="text" name="email" className="register-email" value={params.register.email} onChange={update}/>
      </FormGroup>
      <FormGroup>
        <Label for="name">NAME</Label>
        <Input type="text" name="name" value={params.register.name} onChange={update}/>
      </FormGroup>
      <FormGroup>
        <Label for="password">PASSWORD</Label>
        <Input type="password" className="pwd" name="password" value={params.register.password} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Label for="repassword">RE-TYPE PWD</Label>
        <Input type="password" className="repwd" name="repassword" value={params.register.repassword} onChange={update} />
        <span style={{color:'red'}}>{ params.register.message }</span>
      </FormGroup>

      <Button onClick={submit} color="warning">REGISTER</Button>&nbsp;&nbsp;
      <Link to="/login"><Button>BACK</Button></Link>
    </div>
  );
}

function state2props(state) {
  return { register: state.register,
          token: state.token
        };
}

// Export the result of a curried function call.
export default connect(state2props)(Register);
