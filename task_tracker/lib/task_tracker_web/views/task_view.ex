defmodule TaskTrackerWeb.TaskView do
  use TaskTrackerWeb, :view
  alias TaskTrackerWeb.TaskView
  alias TaskTrackerWeb.UserView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      description: task.description,
      is_finish: task.is_finish,
      start_time: task.start_time,
      title: task.title,
      end_time: task.end_time,
      assignee: render_one(task.assignee, UserView, "user.json"),
      creator: render_one(task.creator, UserView, "user.json")
    }
  end
end
