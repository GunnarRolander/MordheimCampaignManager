class Warband < ApplicationRecord
  belongs_to :place
  belongs_to :spelare
  has_and_belongs_to_many :visited_places, class_name: 'Place'
  has_and_belongs_to_many :battles
  has_many :won_battles, class_name: 'Battle', :foreign_key => 'winner_id'
  has_many :actions
  has_many :controlled_places, class_name: 'Place'

  def visible_places
    visible_places = [self.controlled_places.map { |place| place.linked_places }.flatten, self.controlled_places].flatten
    #visible_places = [self.visited_places, self.place.linked_places].flatten
    return visible_places.uniq
  end

  def visible_links 
    ids = Array.new
    visible_places.each do |place|
      ids << place.id
    end
    return Link.where(place_id: ids, linked_place_id: ids).all.pluck(:place_id, :linked_place_id)
  end

  def visible_warbands
    warbands = []
    visible_places.each do |place|
      next if place.warband.nil?
      warbands << place.warband.attributes.slice('id', 'colour', 'namn', 'place_id')
    end
    return warbands
  end

  def current_action
    turn = Turn.last
    current_action = self.actions.where(turn: turn)
  end
end
