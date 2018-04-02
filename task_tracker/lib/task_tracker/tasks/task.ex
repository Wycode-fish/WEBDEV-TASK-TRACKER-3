defmodule TaskTracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset
  alias TaskTracker.Tasks.Task


  schema "tasks" do
    field :description, :string
    field :end_time, :integer, default: :os.system_time(:seconds)
    field :is_finish, :boolean, default: false
    field :start_time, :integer, default: :os.system_time(:seconds)
    field :title, :string
    belongs_to :creator, TaskTracker.Users.User
    belongs_to :assignee, TaskTracker.Users.User

    timestamps()
  end

  @doc false
  def changeset(%Task{} = task, attrs) do
    IO.puts ">>>>>>>>>>>>>"
    IO.inspect task
    IO.puts ">>>>>>>>>>>>>"
    IO.inspect attrs
    task
    |> cast(attrs, [:title, :description, :start_time, :is_finish, :creator_id, :assignee_id, :end_time])
    |> foreign_key_constraint(:creator_id)
    |> foreign_key_constraint(:assignee_id)
    |> validate_required([:title, :description, :start_time, :is_finish, :creator_id, :assignee_id, :end_time])
  end
end
