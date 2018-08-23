class ApplicationController < ActionController::API
    include ActionController::HttpAuthentication::Basic::ControllerMethods
    include Response

    def authenticate
        @spelare = nil
        authenticate_or_request_with_http_basic do  |u, p|
            spelare = Spelare.where(namn: u).first
            if spelare && spelare.password == p                
                @spelare = spelare
            else
                json_response("Wrong username and/or password", 401)
            end
        end


    end
end
