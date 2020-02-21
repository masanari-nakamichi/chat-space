require "capistrano/setup"
require "capistrano/deploy"
require "capistrano/scm/git"

require 'capistrano/rbenv'
require 'capistrano/bundler'
require 'capistrano/rails/assets'
require 'capistrano/rails/migrations'
require 'sshkit/sudo'

require 'capistrano3/unicorn'


Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }