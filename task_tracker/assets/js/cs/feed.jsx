import React from 'react';
import Task from './task';
import _ from 'underscore';
import { Button, FormGroup, Label, Input } from 'reactstrap';

export default function Feed(params) {
  let tasks = _.map(params.tasks, (tt) => <Task key={tt.id} task={tt} />);
  return<div>
    <div>
      { tasks }
    </div>
  </div>;
}
