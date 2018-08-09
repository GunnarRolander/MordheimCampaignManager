class Battle < ApplicationRecord
  belongs_to :attacker, :class_name => 'Warband'
  belongs_to :defender, :class_name => 'Warband'
  belongs_to :winner, :class_name => 'Warband'
  belongs_to :place
  belongs_to :turn
end
