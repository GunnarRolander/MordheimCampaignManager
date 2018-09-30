class TurnsController < ApplicationController
    include Response, Move
    before_action :set_current_turn

    def get_turn
        json_response(@current_turn)
    end

    def next_turn
        json_response('Du är inte admin, lägg av!', 400) unless @spelare.admin
        if @current_turn.fas == 'Strid'
            battles_left = Battle.where(turn: @current_turn).all.select{|b| b.winner.nil?}
            if (battles_left.any?)
                json_response(battles_left)
            else
                new_turn = Turn.new()
                new_turn.nummer = @current_turn.nummer + 1
                new_turn.fas = "Ordergivning"
                new_turn.save
                json_response('Ny runda'.to_json)
            end
        else
            json_response('Fel fas, byt fas först', 400)
        end
    end

    def next_phase
        json_response('Du är inte admin, lägg av!', 400) unless @spelare.admin
        @current_turn.fas = "Strid"
        @current_turn.save
        calculate_coming_battles
        json_response('Ny fas: Strid!'.to_json)
    end

    #private
    def set_current_turn
        @current_turn = Turn.last
    end

    def calculate_coming_battles
        actions = Action.where(turn: @current_turn)
        unopposed_moves = []
        actions.each do |action|
            destination = action.place
            if destination.warband != action.warband
                puts "Action-warband doesn't control destination"
                # If the destination is uncontrolled, check for other warbands moving in. Else, just move there.
                if destination.warband.nil?
                    puts "Destination uncontrolled"
                    opposed = false
                    Action.where(place: destination, turn: @current_turn).where.not(warband: action.warband).each do |opposing_action|
                        b = Battle.joins(:warbands).where(:warbands => {id: action.warband.id}, :turn => @current_turn, :place => destination).first_or_create()
                        b.warbands = [opposing_action.warband, action.warband]
                        b.turn = @current_turn
                        b.place = destination
                        b.save
                        opposed = true
                    end
                    unless opposed
                        unopposed_moves << [action.warband, destination]                      
                    end
                # If the controlling warband is nearby, create a battle.    
                elsif destination.linked_places.exists?(destination.warband.place.id) || destination.warband.place == destination
                    puts "Controlling warband nearby"
                    b = Battle.new(place: action.place, turn: @current_turn)
                    b.warbands = [destination.warband, action.warband]
                    b.save
                else
                    puts "Uncontested"
                    unopposed_moves << [action.warband, destination]
                end
            end
        end

        # Do unopposed moves last to avoid unexpected consequences in battle calculation
        unopposed_moves.each do |move|
            move_warband(move[0], move[1])
        end
    end
end
