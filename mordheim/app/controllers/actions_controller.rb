class ActionsController < ApplicationController
    include Response
    before_action :authenticate
    def register_action
        @current_turn = Turn.last
        warband = @spelare.warband
        destination = Place.find(params['destination_id'])
        json_response("Missing parameters", 400) if warband.nil? || destination.nil?

        action = Action.first_or_create(warband: warband, turn: @current_turn)
        action.place = destination
        action.typ = warband.place == destination ? "Remain" : "Move" 
        action.save
        json_response("Recieved order")
    end
end
