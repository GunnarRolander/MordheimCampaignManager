class TurnsController < ApplicationController
    include Response, Move
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

    #private
    def set_current_turn
        @current_turn = Turn.last
    end

    def calculate_coming_battles
        actions = Action.where(turn: @current_turn)
        actions.each do |action|
            destination = action.place
            if destination.controlling_warband != action.warband
                puts "Action-warband doesn't control destination"
                # If the destination is uncontrolled, check for other warbands moving in.
                if destination.controlling_warband.nil?
                    puts "Destination uncontrolled"
                    opposed = false
                    Action.where(place: destination, turn: @current_turn).where.not(warband: action.warband).each do |opposing_action|
                        b = Battle.join(:warbands).where(:warbands => {id: action.warband.id}, :turn => @current_turn, :place => destination).first_or_create()
                        b.warbands = [opposing_action.warband, action.warband]
                        b.turn = @current_turn
                        b.place = destination
                        b.save
                        opposed = true
                    end
                    move_warband(action.warband, destination) unless opposed
                # If the controlling warband is nearby, create a battle.    
                elsif destination.linked_places.exists?(destination.warband.place.id) || destination.warband.place == destination
                    puts "Controlling warband nearby"
                    b = Battle.new(place: action.place, turn: @current_turn)
                    b.warbands = [destination.warband, action.warband]
                    b.save
                else
                    puts "Uncontested"
                    move_warband(action.warband, action.destination)
                end
            end
        end
    end
end
