class Warband < ApplicationRecord
  belongs_to :place
  belongs_to :spelare
  has_and_belongs_to_many :visited_places, class_name: 'Place'
  has_many :battles
  has_many :actions
  has_many :places
end
