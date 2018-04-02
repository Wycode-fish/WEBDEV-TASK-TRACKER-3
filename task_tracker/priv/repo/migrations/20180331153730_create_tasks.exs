defmodule TaskTracker.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :description, :string, null: false
      add :is_finish, :boolean, default: false, null: false
      add :start_time, :integer, null: false
      add :title, :string, null: false
      add :end_time, :integer, default: 0
      add :creator_id, references(:users, on_delete: :delete_all), null: false
      add :assignee_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:tasks, [:creator_id])
    create index(:tasks, [:assignee_id])
  end
end
