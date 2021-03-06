class TurnsController < ApplicationController
    include Response, Move
    before_action :authenticate, except: :get_turn
    before_action :set_current_turn
    before_action :authenticate, except: :get_turn

    def get_turn
        json_response(@current_turn)
    end

    def next_turn
        json_response('Du är inte admin, lägg av!', 400) unless @spelare.admin
        if @current_turn.fas == 'Strid'
            battles_left = Battle.where(turn: @current_turn).all.select{|b| b.winner.nil?}
            if (battles_left.any?)
                json_response(battles_left.to_json(
                    :include => {
                        :warbands => {
                            :except => [:place_id]
                        }
                    },
                    :except => [:place_id]
                ))
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

    def get_battles
        json_response(Battle.where(turn: @current_turn).all.select{|b| b.winner.nil?}.to_json(
            :include => {
                :warbands => {
                    :except => [:place_id]
                }
            },
            :except => [:place_id]
        ))
    end

    def get_actions
        json_response(Action.where(turn: @current_turn).to_json(
            :include => {
                :warband => {
                    :except => [:place_id, :typ]
                }
            },
            :except => [:place_id]
        ))
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

                # If the controlling warband is nearby, create a battle.
                if !destination.warband.nil? && (destination.linked_places.exists?(destination.warband.place.id) || destination.warband.place == destination)
                    puts "Controlling warband nearby"
                    b = Battle.find_or_create_by(place: action.place, turn: @current_turn)
                    b.warbands << destination.warband if b.warbands.empty?
                    b.warbands << action.warband
                    b.save
                # If the destination is uncontrolled/undefended, check for other warbands moving in. Else, just move there.
                else
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
                end
            else
                # If the destination is controlled by the moving warband, it's unopposed.
                puts "Uncontested"
                unopposed_moves << [action.warband, destination]
            end
        end

        # Do unopposed moves last to avoid unexpected consequences in battle calculation
        unopposed_moves.each do |move|
            move_warband(move[0], move[1])
        end
    end
end
