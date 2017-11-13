require "dotenv/load"
require "sinatra"
require "sinatra/contrib"
require "slim"
require "json"
require_relative "./lib/gfile"

config_file "config.yml"

configure do
  set :server, "puma"
  set :root, File.dirname(__FILE__)
  set :public_folder, proc { File.join(root, "dist/public") }
  set :views, proc { File.join(root, "dist/views") }
  set :slim, layout: :"layouts/default"
end

get "/" do
  slim :index
end

post "/gem", provides: :json do
  uploaded_gfile = params[:file][:tempfile].open
  params[:file][:tempfile].close
  Gfile.new(uploaded_gfile).gems.to_json
end
