import React from 'react';
import Task from './task';
import _ from 'underscore';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import Editable from './editable'

export default function Assigned(params) {
  let tasks = _.map(params.tasks, (tt) => <Editable key={tt.id} task={tt} />);
  return<div>
    <div>
      { tasks }
    </div>
  </div>;
}
