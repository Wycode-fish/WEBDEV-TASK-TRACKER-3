import $ from 'jquery';
import store from './store';

class TrackerServer {
  request_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'TASKS_LIST',
          tasks: resp.data,
        });
      },
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'USERS_LIST',
          users: resp.data,
        });
      },
    });
  }

  submit_task(data) {
    $.ajax("/api/v1/tasks", {
      async: false,
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, task: data }),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_TASK',
          tasks: resp.data,
        });
      },
    });
  }

  submit_login(data) {
      $.ajax("/api/v1/token", {
        method: "post",
        async: false,
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(data),
        success: (resp) => {
          store.dispatch({
            type: 'SET_TOKEN',
            token: resp,
          });
        },
        error: (resp)=> {
          store.dispatch({
            type: 'UPDATE_LOGIN_FORM',
            token: resp,
          });
        },
      });
    }

    submit_register(data) {
        $.ajax("/api/v1/users", {
          method: "post",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: JSON.stringify(data),
          success: (resp) => {
            store.dispatch({
              type: 'ADD_USER',
              token: resp,
            });
          },
        });
      }

      delete_task(delete_id) {
          $.ajax("/api/v1/tasks"+"/"+delete_id, {
            method: "delete",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            // data: JSON.stringify(data),
            success: (resp) => {
              store.dispatch({
                type: 'DROP_TASK',
                delete_id: delete_id,
              });
            },
          });
        }

        finish_task(data) {
            $.ajax("/api/v1/tasks"+"/"+data.id, {
              method: "put",
              dataType: "json",
              contentType: "application/json; charset=UTF-8",
              data: JSON.stringify({id: data.id, data: data}),
              success: (resp) => {
                store.dispatch({
                  type: 'FINISH_TASK',
                  data: resp.data,
                });
              },
            });
          }

          update_task(data) {
              console.log("update", data);
              $.ajax("/api/v1/tasks"+"/"+data.id, {
                method: "put",
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify({id: data.id, data: data}),
                success: (resp) => {
                  store.dispatch({
                    type: 'UPDATE_TASK',
                    data: resp.data,
                  });
                },
              });
            }

}

export default new TrackerServer();
