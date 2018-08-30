# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

s = Spelare.create(namn: 'Gunnar', password: 'bananer', admin: true)
s2 = Spelare.create(namn: 'Jens', password: 'bananer', admin: true)
p = Place.create(namn: 'Testarea 1', beskrivning: 'Testest', lat: -177, lng: 156)
p2 = Place.create(namn: 'Testarea 2', beskrivning: 'Testest', lat: -161, lng: 201)
w = s.create_warband!(namn: 'Hexenjaeger', typ: 'Witch Hunters', place_id: p.id)
w2 = s2.create_warband!(namn: 'Sigmarssystrarna', typ: 'Sisters of Sigmar', place_id: p2.id)
p.warband_id = w.id
p.save
p2.warband_id = w2.id
p2.save

p3 = Place.create(namn: 'Testarea 3', beskrivning: 'Testest', warband: w2, lat: -150, lng: 134)
p4 = Place.create(namn: 'Testarea 4', beskrivning: 'Testest', warband: w2, lat: -128, lng: 168)
w2.visited_places << p3
w2.visited_places << p4
w2.visited_places << p2


p.linked_places << [p4, p2]
p2.linked_places << [p, p3]
w.visited_places << p
p.save

t = Turn.create(nummer: 1, fas: "Ordergivning")
=begin
t2 = Turn.create(nummer: 2, fas: "Order")
b = Battle.create(place: p2, turn: t2)
b.warbands << [w, w2]
b.save
b2 = Battle.create(place: p2, turn: t, winner: w)
b2.warbands << [w, w2]
b2.save
b3 = Battle.create(place: p4, turn: t2)
b3.warbands << [w, w2]
b3.save
a = Action.create(turn: t2, warband: w, place: p)
a2 = Action.create(turn: t, warband: w2, place: p)
=end



