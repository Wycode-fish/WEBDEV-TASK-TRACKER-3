# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskTracker.Repo.insert!(%TaskTracker.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Seeds do
  alias TaskTracker.Repo
  alias TaskTracker.Users.User
  alias TaskTracker.Tasks.Task

  def run do
    p = Comeonin.Argon2.hashpwsalt("password1");

    Repo.delete_all(User)
    a = Repo.insert!(%User{ email: "eason@qq.com", name: "eason", password_hash: p});
    b = Repo.insert!(%User{ email: "ruqi@qq.com", name: "ruqi", password_hash: p});

    Repo.delete_all(Task)
    Repo.insert!(%Task{ description: "this is task1.",
                        title: "task1",
                        is_finish: false,
                        start_time: 0,
                        end_time: 10,
                        creator_id: a.id,
                        assignee_id: b.id});
  end
end

Seeds.run;
