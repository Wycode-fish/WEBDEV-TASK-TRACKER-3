import React from 'react';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Card, CardBody } from 'reactstrap';
import _ from 'underscore';

function User(params) {
  return <Card><CardBody><p>{params.user.name+" ("+params.user.email+") "}</p></CardBody></Card>;
}

export default function Users(params) {
  let users = _.map(params.users, (uu) => <User key={uu.id} user={uu} />);
  return <div>
    <div>
      { users }
    </div>
  </div>;
}
