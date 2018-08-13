class BattlesController < ApplicationController
    include Response, Move
    before_action :set_warband
    def get_battles
        json_response(Battle.joins(:warbands).where('warbands.id' => @warband.id))
    end

    def register_result
        winner = Warband.find(params['winner_id'])
        battle = Battle.find(params['battle_id'])
        json_response("Missing parameters", 400) if (winner.nil? || battle.nil?)

        participants = battle.warbands
        defender = battle.place.controlling_warband
        if @warband != winner && @warband == defender
            loser_move_place = Place.find(params['loser_move_place_id'])
            json_response("Missing losers move", 400) if loser_move_place.nil?
            move(@warband, loser_move_place)
        end
        battle.winner = winner
        battle.save
        move(winner, place)
    end

    private

    def set_warband
        @warband = Warband.find(params['warband_id'])
        json_response("Missing warband_id", 400) if @warband.nil?
    end
end
