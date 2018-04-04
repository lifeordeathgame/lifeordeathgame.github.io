require 'rubygems'
require 'eventmachine'
require 'em-websocket'

EM.run do
  @main_channel = EM::Channel.new
  @subscribers = []
  
  EM::WebSocket.start(:host => "0.0.0.0", :port => 8100) do |ws|
    ws.onopen do
      puts "WebSocket connection open"
      subscriber_id = @main_channel.subscribe do |msg|
        ws.send(msg)
      end
      ws.send "Welcome!"
      
      ws.onclose do
        puts "Connection closed"
        @main_channel.unsubscribe(subscriber_id)
      end

      ws.onmessage do |msg|
        @main_channel.push(msg)
      end
    end
  end
end
