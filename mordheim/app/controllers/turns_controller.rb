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
            new_turn.save
            json_response('Ny turn')
        else
            json_response('Fel fas, byt fas först', 400)
        end
    end

    def next_phase
        @current_turn.fas = "Strid"
        @current_turn.save
        calculate_coming_battles
        json_response('Ny fas: Strid!')
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
                # If the destination is uncontrolled, check for other warbands moving in.
                if destination.controlling_warband.nil?
                    Action.where(place: destination, turn: @current_turn).not(warband: action.warband).each do |opposing_action|
                        Battle.first_or_create()
                        # TODO: Fixa detta.
                    end
                # If the controlling warband is nearby, create a battle.    
                elsif destination.linked_places.contains(destination.controlling_warband.place)
                    b = Battle.new(place: action.place, turn: @current_turn)
                    b.warbands = [destination.controlling_warband, action.warband]
                end
            end
        end
    end
end
