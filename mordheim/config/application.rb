require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Mordheim
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        # In development, we don't care about the origin.
        origins 'localhost:3000', 'localhost:3001'
        # Reminder: On the following line, the 'methods' refer to the 'Access-
        # Control-Request-Method', not the normal Request Method.
        resource '*', :headers => :any, :methods => [:get, :post, :options, :delete, :put, :patch], credentials: true
      end
    end

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
