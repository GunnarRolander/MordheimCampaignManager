class TurnsController < ApplicationController
    include Response
    before_action :set_current_turn

    def get_turn
        json_response(@current_turn)
    end

    def next_turn
        if @current_turn.fas == 'Strid'
            new_turn = Turn.new()
            new_turn.nummer = @current_turn.nummer + 1
            new_turn.fas = "Ordergivning"
            json_response('Ny turn')
        else
            json_response('Fel fas, byt fas först', 400)
        end
    end

    def next_phase
        @current_turn.fas = "Strid"
        @current_turn.save
        calculate_coming_battles
    end

    private
    def set_current_turn
        @current_turn = Turn.last
    end

    def calculate_coming_battles
        actions = Action.where(turn: @current_turn)
        actions.each do |action|
            destination = action.place
            if destination.controlling_warband != action.warband
                if destination.controlling_warband.nil?
                    Action.where(place: destination).not(warband: action.warband).each do |opposing_action|
                        Battle.where(attacker: opposing_action.warband, defender: action.warband, place: action.place, turn: action.turn)
                            .or(attacker: action.warband, defender: opposing_action.warband, place: action.place, turn: action.turn).find_or_create
                    end
                elsif destination.linked_places.contains(destination.controlling_warband.place)
                    Battle.create(attacker: action.warband, defender: destination.controlling_warband, place: action.place)
                end
            end
        end
    end
end
