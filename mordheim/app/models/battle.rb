require 'set'
class Battle < ApplicationRecord
  has_and_belongs_to_many :warbands
  belongs_to :winner, :class_name => 'Warband', optional: true
  belongs_to :place
  belongs_to :turn

  def possible_retreats
    retreats = self.place.linked_places.where(warband: self.place.warband)
    retreats = find_closest_place_belonging_to_warband(self.place.warband) if retreats.empty?
    retreats = find_closest_place_belonging_to_warband(nil) if retreats.empty?
    return retreats
  end

  private
  def find_closest_place_belonging_to_warband(warband)
    examined_places = [self.place].to_set
    places_to_examine = examined_places

    while(true)
      places_to_examine = places_to_examine.map{ |place| place.linked_places }.flatten.to_set
      places_to_examine = places_to_examine.subtract(examined_places)

      if places_to_examine.empty?
        closest_place = []
        break
      end

      controlled_retreats = places_to_examine.select {| place | place.warband == warband || place.warband_id == warband}

      unless controlled_retreats.empty?
        random_place = controlled_retreats.to_a.sample
        closest_place = [random_place]
        break
      end

      examined_places.merge( places_to_examine )
    end

    return closest_place
  end
end
