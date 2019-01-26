defmodule ChatWeb.RoomChannel do
  use Phoenix.Channel
  require Logger

  def join("room:lobby", msg, socket) do
    Process.flag(:trap_exit, true)
    send(self, {:after_join, msg})

    {:ok socket}
  end

  def join("rooms:" <> _private_subtopic, msg, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_info({:after_join, msg}, socket) do
    broadcast! socket, "user:entered", %{user: msg["user"]}

    {:noreply, socket}
  end
end
