class Battle < ApplicationRecord
  has_and_belongs_to_many :warbands
  belongs_to :winner, :class_name => 'Warband', optional: true
  belongs_to :place
  belongs_to :turn
end
