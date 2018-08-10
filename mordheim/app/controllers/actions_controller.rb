class ActionsController < ApplicationController
    def register_action
        @current_turn = Turn.last
        warband = Warband.find(params['warband_id'])
        destination = Place.find(params['destination_id'])
        json_response("Missing parameters", 400) if warband.nil? || destination.nil?

        action = Action.find_or_create(warband: warband, turn: @current_turn)
        action.place = destination
        action.typ = warband.place == destination ? "Remain" : "Move" 
        action.save
    end
end
