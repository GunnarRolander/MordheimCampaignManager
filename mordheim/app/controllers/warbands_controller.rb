class WarbandsController < ApplicationController
    include Response
    include Move
    before_action :authenticate, :set_warband

    def index
        @warbands = Warband.all
        json_response(@warbands)
    end

    def get_warband
        json_response(@warband.to_json(
            :include => {
                :place => {
                    :include => {:linked_places => {}
                    }
                }, :battles => {
                    :include => {
                        :warbands => {}, :place => {}
                    }, 
                    :methods => :possible_retreats
                }
            }, 
            :methods => [:visible_places, :visible_links, :current_action])
        )
    end

    def visible_places
        visible_places = @warband.visited_places
        visible_places << @warband.place.linked_places
        visible_places.uniq
        json_response(visible_places.uniq)
    end

    def move_warband(destination_id)
        destination = Place.find(destination_id)
        move(@warband, destination)
    end

    def get_moveable_places
        json_response(@warband.place.linked_places)
    end

    def get_coming_battles
        json_response(@warband.battles.where(winner: nil))
    end

    def get_fought_battles
        json_response(@warband.battles)
    end

    private

    def set_warband

        @warband = @spelare.warband
        json_response("Missing warband_id", 400) if @warband.nil?
    end

end
