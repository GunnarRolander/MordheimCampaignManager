class WarbandsController < ApplicationController
    include Response
    include Move
    before_action :authenticate
    before_action :set_warband, except: :create_warband

    def index
        @warbands = Warband.all
        json_response(@warbands)
    end

    def create_warband
        starting_place = Place.first(8).select {|p| p.warband.nil? }.sample
        w = @spelare.create_warband!(namn: params['warband_name'], typ: params['warband_type'], 
            colour: params['colour'], place: starting_place)
        w.visited_places << starting_place
        w.save
        starting_place.warband = w
        starting_place.save
        json_response("Warband created successfully")
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
            :methods => [:visible_places, :visible_links, :current_action, :visible_warbands])
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
        json_response("Create new warband".to_json, 200) if @warband.nil?
    end

end
