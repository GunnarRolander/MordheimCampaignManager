class Action < ApplicationRecord
  belongs_to :turn
  belongs_to :warband
  belongs_to :place
end
