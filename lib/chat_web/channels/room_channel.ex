defmodule ChatWeb.RoomChannel do
  use Phoenix.Channel
  require Logger

  def join("room:lobby", msg, socket) do
    Logger.debug "got into room lobby"
    send(self, {:after_join, msg})

    {:ok, socket}
  end

  def handle_info({:after_join, msg}, socket) do
    broadcast! socket, "user:entered", %{name: msg["name"]}

    {:noreply, socket}
  end

  def handle_in("new:msg", msg, socket) do
    broadcast! socket, "new:msg", %{name: msg["name"], body: msg["body"]}

    {:noreply, socket}
  end
end
