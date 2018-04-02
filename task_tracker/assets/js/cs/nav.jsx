import React from 'react';
import { NavLink, Redirect, Link } from 'react-router-dom';
import { NavItem, Button } from 'reactstrap';
import { Login } from './login'
import api from '../api'
import { connect } from 'react-redux';

let Session = connect(({token}) => {return {token};})((props) => {

  function logout() {
    let data = {};
    data['token'] = "";
    let action = {
      type: 'DROP_TOKEN',
      data: data,
    }
    props.dispatch(action);
  }

  return <div className="navbar-text">
    USER: {" "}{ props.token.user_name } &nbsp;|&nbsp;<Link to='/login'><Button onClick={logout}>LOG OUT</Button></Link>
  </div>;
});

function Nav(props) {
  let session_info;
  if (props.token) {
    session_info = <Session token={props.token} />;
  } else {
    return <Redirect to="/login" push={true} />
  }
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand">
        <h4 style={{color: 'red', fontFamily: "cursive"}}>ReduxTracker</h4>
        <ul className="navbar-nav mr-auto">
          <NavItem style={{marginLeft: 20}}>
            <NavLink to="/users" href="#" className="nav-link">All Users</NavLink>
          </NavItem>
        </ul>
          { session_info }
      </nav>
    </div>
  );
}

function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props)(Nav);
