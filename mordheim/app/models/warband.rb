class Warband < ApplicationRecord
  belongs_to :place
  belongs_to :spelare
  has_and_belongs_to_many :visited_places, class_name: 'Place'
  has_and_belongs_to_many :battles
  has_many :won_battles, class_name: 'Battle', :foreign_key => 'winner_id'
  has_many :actions
  has_many :controlled_places, class_name: 'Place'
end
