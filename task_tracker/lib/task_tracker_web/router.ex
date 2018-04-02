defmodule TaskTrackerWeb.Router do
  use TaskTrackerWeb, :router

  import TaskTrackerWeb.Plugs.GetCurrentUser

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    # After fetch_session in the browser pipeline:
    plug :get_current_user
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  # Below the pipeline
  # def get_current_user(conn, _params) do
  #   # TODO: Move this function out of the router module.
  #   user_id = get_session(conn, :user_id)
  #   user = TaskTracker.Accounts.get_user(user_id || -1)
  #   IO.puts "*************"
  #   IO.inspect user;
  #   assign(conn, :current_user, user)
  # end

  scope "/", TaskTrackerWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index

    get "/users/*path", PageController, :index
    get "/tasks/*path", PageController, :index
    get "/users/:id", PageController, :index
    get "/login", PageController, :index
    get "/register", PageController, :index
    # resources "/users", UserController
    # resources "/tasks", TaskController
    post "/session", SessionController, :create
    delete "/session", SessionController, :delete
  end

  scope "/api/v1", TaskTrackerWeb do
    pipe_through :api
    resources "/tasks", TaskController, except: [:new, :edit]
    resources "/users", UserController, except: [:new, :edit]
    post "/token", TokenController, :create
  end

  # Other scopes may use custom stacks.
  # scope "/api", TaskTrackerWeb do
  #   pipe_through :api
  # end
end
