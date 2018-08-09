class Link < ApplicationRecord
  belongs_to :place_linked, foreign_key: :place_id, :class_name => 'Place'
  belongs_to :linked_place, foreign_key: :linked_place_id , :class_name => 'Place'
end
