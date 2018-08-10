class BattlesController < ApplicationController
    before_action :set_warband
    def get_battles
        json_response(Battle.where(attacker: @warband).or(defender: @warband))
    end

    def register_result
        winner = Warband.find(params['winner_id'])
        battle = Battle.find(params['battle_id'])
        json_response("Missing parameters", 400) if (winner.nil? || battle.nil?)
        loser = winner == battle.attacker ? battle.defender : battle.attacker
        if @warband == loser && @warband == battle.defender
            loser_move_place = Place.find(params['loser_move_place_id'])
            json_response("Missing losers move", 400) if loser_move_place.nil?
            move(@warband, loser_move_place)
        end
        battle.winner = winner
        battle.save
        place = battle.place
        place.controlling_warband = winner
        place.save
        move(winner, place)
    end

    private

    def set_warband
        @warband = Warband.find(params['warband_id'])
        json_response("Missing warband_id", 400) if @warband.nil?
    end
end
