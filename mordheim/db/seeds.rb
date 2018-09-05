# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'json'

pos_json = File.read('place_positions.json')
desc_json = File.read('place_descriptions.json')
pos_array = JSON.parse(pos_json)
desc_array = JSON.parse(desc_json)

set_up_places = {}

starting_places = pos_array.slice(40, 47)
starting_places.each_with_index do |place, idx|
    set_up_places[place["id"].to_i] = Place.create(namn: 'Starting area ' + idx.to_s, 
        beskrivning: 'This is a way into Mordheim', lat: place['lat'].to_i, lng: place['lng'].to_i)
end

other_places = pos_array.slice(0, 39)
other_places.each_with_index do |place, idx|
    set_up_places[place["id"].to_i] = Place.create(namn: place['name'], 
        beskrivning: place['description'], lat: place['lat'].to_i, lng: place['lng'].to_i)
end

s = Spelare.create(namn: 'Gunnar', password: 'bananer', admin: true)
s2 = Spelare.create(namn: 'Jens', password: 'bananer', admin: true)
#p = Place.create(namn: 'Testarea 1', beskrivning: 'Testest', lat: -177, lng: 156)
#p2 = Place.create(namn: 'Testarea 2', beskrivning: 'Testest', lat: -161, lng: 201)
#w = s.create_warband!(namn: 'Hexenjaeger', typ: 'Witch Hunters', colour: '#800000', place_id: p.id)
#w2 = s2.create_warband!(namn: 'Sigmarssystrarna', typ: 'Sisters of Sigmar', colour: '#dfbe9f', place_id: p2.id)
#p.warband_id = w.id
#p.save
#p2.warband_id = w2.id
#p2.save

p3 = Place.create(namn: 'Testarea 3', beskrivning: 'Testest', lat: -150, lng: 134)
p4 = Place.create(namn: 'Testarea 4', beskrivning: 'Testest', lat: -128, lng: 168)
#w.visited_places << p4
#w2.visited_places << p2


p.linked_places << [p4, p2]
p2.linked_places << [p, p3]
p3.linked_places << [p2, p4]
p4.linked_places << [p, p3]
#w.visited_places << p
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



