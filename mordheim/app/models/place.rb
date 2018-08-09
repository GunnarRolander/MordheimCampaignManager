class Place < ApplicationRecord
  belongs_to :warband, optional: true
  has_and_belongs_to_many :linked_places,
                          class_name: 'Place',
                          join_table: :links,
                          foreign_key: :place_id,
                          association_foreign_key: :linked_place_id,
                          uniq: true,
                          finder_sql: proc { %(SELECT DISTINCT "places".* FROM "places"
                                              INNER JOIN "links" ON "places"."id" = "links"."linked_place_id"
                                              WHERE "links"."place_id" =  #{self.id}
                                              UNION
                                              SELECT DISTINCT "places".* FROM "places"
                                              INNER JOIN "links" ON "places"."id" = "links"."place_id"
                                              WHERE "links"."linked_place_id" =  #{self.id} )}
  has_one :warband
end
