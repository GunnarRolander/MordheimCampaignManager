class ActionsController < ApplicationController
    include Response
    before_action :authenticate
    def register_action
        @current_turn = Turn.last
        warband = @spelare.warband
        destination = Place.find(params['destination_id'])
        json_response("Missing parameters", 400) if warband.nil? || destination.nil?

        action = Action.find_or_create_by(warband: warband, turn: @current_turn)
        puts action.to_s, @current_turn.nummer, warband.namn
        action.place = destination
        action.typ = warband.place == destination ? "Remain" : "Move" 
        action.save
        json_response("Recieved order")
    end
end
