require 'set'
class Battle < ApplicationRecord
  has_and_belongs_to_many :warbands
  belongs_to :winner, :class_name => 'Warband', optional: true
  belongs_to :place
  belongs_to :turn

  def possible_retreats
    retreats = self.place.linked_places.where(warband: self.place.warband)

    if retreats.empty?
      examined_places = self.place.linked_places.to_set
      places_to_examine = examined_places
      examined_places << self.place

      while(true)
        places_to_examine = places_to_examine.map{ |place| place.linked_places }.flatten.to_set      
        places_to_examine = places_to_examine - examined_places
        break if places_to_examine.empty?

        controlled_retreats = places_to_examine.keep_if {| place | place.warband == self.place.warband}
        
        unless controlled_retreats.empty?
          random_place = controlled_retreats.to_a.sample
          retreats = [random_place]
          break
        end

        examined_places << places_to_examine
      end

    end
    return retreats
  end
end
