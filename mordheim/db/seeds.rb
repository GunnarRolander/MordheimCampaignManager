# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

s = Spelare.create(namn: 'Gunnar', password: 'bananer', admin: true)
s.save
p = Place.create(namn: 'Testarea 1', beskrivning: 'Testest')
w = s.create_warband!(namn: 'Hexenjaeger', typ: 'Witch Hunters', place_id: p.id)
p.warband_id = w.id
p.save

p2 = Place.create(namn: 'Testarea 2', beskrivning: 'Testest')
p3 = Place.create(namn: 'Testarea 3', beskrivning: 'Testest')
p4 = Place.create(namn: 'Testarea 4', beskrivning: 'Testest')

p.linked_places << [p4, p2]
p2.linked_places << [p, p3]
w.visited_places << p
p.save


