defmodule TaskTrackerWeb.TaskController do
  use TaskTrackerWeb, :controller

  alias TaskTracker.Tasks
  alias TaskTracker.Tasks.Task

  action_fallback TaskTrackerWeb.FallbackController

  def index(conn, _params) do
    tasks = Tasks.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"task" => task_params, "token" => token}) do
      IO.puts "****************"
      IO.inspect task_params;
      IO.puts "..........."
      IO.inspect token;
      {:ok, user_id} = Phoenix.Token.verify(conn, "auth token", token, max_age: 86400)
      IO.puts "..........."
      IO.inspect user_id;
      if task_params["creator_id"] != user_id do
        IO.inspect({:bad_match, task_params["user_id"], user_id})
        raise "hax!"
      end

      with {:ok, %Task{} = task} <- Tasks.create_task(task_params) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", task_path(conn, :show, task))
        |> render("show.json", task: task)
      end
  end

  def show(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "data" => task_params}) do
    IO.puts "before.>>>>>>>>>"
    IO.inspect id
    task = Tasks.get_task!(id)
    IO.puts "<<<<<<<<<<<<<"
    IO.inspect task
    IO.puts "<<<<<<<<<<<<<"
    IO.inspect task_params
    with {:ok, %Task{} = task} <- Tasks.update_task(task, task_params) do
      render(conn, "show.json", task: task)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    with {:ok, %Task{}} <- Tasks.delete_task(task) do
      send_resp(conn, :no_content, "")
    end
  end
end
