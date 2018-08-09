class Warband < ApplicationRecord
  belongs_to :place
  belongs_to :spelare
  has_many :battles
  has_many :actions
  has_many :places
end
