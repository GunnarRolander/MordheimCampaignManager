# app/controllers/concerns/move.rb
module Move
    def move_warband(warband, place)
        warband.controlled_places << place unless warband.controlled_places.include?(place)
        warband.visited_places << place unless warband.visited_places.include?(place)
        warband.place = place
        warband.save
        place.controlling_warband = warband
        place.save
    end
end