defmodule ChatWeb.RoomChannel do
  use Phoenix.Channel
  require Logger

  def join("room:lobby", msg, socket) do
    send(self, {:after_join, msg})

    {:ok socket}
  end

  def handle_info({:after_join, msg}, socket) do
    broadcast! socket, "user:entered", %{user: msg["user"]}

    {:noreply, socket}
  end
end
