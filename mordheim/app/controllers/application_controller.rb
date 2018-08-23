class ApplicationController < ActionController::API
    include ActionController::HttpAuthentication::Basic::ControllerMethods

    def authenticate
        @spelare = nil
        authenticate_or_request_with_http_basic do  |u, p| 
            if Spelare.where(namn: u).first.password == p
                @spelare = Spelare.where(namn: u).first
            else
                json_response("Inloggningen var felaktig", 401)
            end
        end


    end
end
