import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Provider, connect } from 'react-redux';
import $ from "jquery";
import _ from "underscore"

import Nav from './nav';
import Feed from './feed';
import Users from './users';
import TaskForm from './task-form';
import Login from './login';
import Register from './register';
import Assigned from './assigned';

// export default function tracker_init() {
//   let root = document.getElementById('root');
//   ReactDOM.render(<Tracker />, root);
// }
export default function tracker_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <Tracker />
    </Provider>,
    document.getElementById('root'),
  );
}

// class Tracker extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       tasks: [],
//       users: [],
//     };
//
//     // this.request_tasks();
//     // this.request_users();
//   }
//
//   // request_tasks() {
//   //   $.ajax("/api/v1/tasks", {
//   //     method: "get",
//   //     dataType: "json",
//   //     contentType: "application/json; charset=UTF-8",
//   //     success: (resp) => {
//   //       this.setState(_.extend(this.state, { tasks: resp.data }));
//   //     },
//   //   });
//   // }
//   //
//   // request_users() {
//   //   $.ajax("/api/v1/users", {
//   //     method: "get",
//   //     dataType: "json",
//   //     contentType: "application/json; charset=UTF-8",
//   //     success: (resp) => {
//   //       this.setState(_.extend(this.state, { users: resp.data }));
//   //     },
//   //   });
//   // }
//
//   render() {
//     return (
//       <Router>
//         <div>
//           <Nav />
//           <Route path="/" exact={true} render={() =>
//             <div>
//               <TaskForm users={this.state.users} />
//               <Feed tasks={this.state.tasks} />
//             </div>
//           } />
//           <Route path="/users" exact={true} render={() =>
//             <Users users={this.state.users} />
//           } />
//           <Route path="/users/:user_id" render={({match}) =>
//             <Feed tasks={_.filter(this.state.tasks, (tt) =>
//               match.params.assignee_id == tt.assignee_id )
//             } />
//           } />
//         </div>
//       </Router>
//     );
//   }
// }

let Tracker = connect((state) => state)((props) => {
  return (
    <Router>
      <div>
        <Nav />
        
        <Route path="/login" exact={true} render={() =>
          <div>
            <Login users={props.users} />
          </div>
        } />

      <Route path="/register" exact={true} render={() =>
          <div>
            <Register users={props.users} />
          </div>
        } />

        <Route path="/" exact={true} render={() =>
          <div>
            <TaskForm users={props.users} />
          </div>
        } />

        <Route path="/users" exact={true} render={() =>
          <div>
            <Users users={props.users} />
            <Link to="/login"><Button>BACK</Button></Link>
          </div>
        } />

        <Route path="/users/:user_id" render={({match}) =>
          <div>
            <div className="jumbotron">
              <h3> WORK LOG </h3>
              <Feed tasks={_.filter(props.tasks, (tt) =>
                  match.params.user_id == tt.assignee.id
                )
              } />
            </div>
            <div className="jumbotron">
              <h3> MONITOR </h3>
              <Assigned tasks={_.filter(props.tasks, (tt) =>
                  match.params.user_id == tt.creator.id
                )
              } />
            </div>
            <br/>
            <Link to="/login"><Button>BACK</Button></Link>
          <br/>

          </div>
        } />
      </div>
    </Router>
  );
});
