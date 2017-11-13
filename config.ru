require "rack-livereload"
require "./main"

use Rack::LiveReload
run Sinatra::Application
