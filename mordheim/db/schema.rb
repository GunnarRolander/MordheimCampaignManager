# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_08_13_120042) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "actions", force: :cascade do |t|
    t.string "typ"
    t.bigint "turn_id"
    t.bigint "warband_id"
    t.bigint "place_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["place_id"], name: "index_actions_on_place_id"
    t.index ["turn_id"], name: "index_actions_on_turn_id"
    t.index ["warband_id"], name: "index_actions_on_warband_id"
  end

  create_table "battles", force: :cascade do |t|
    t.bigint "winner_id"
    t.bigint "place_id"
    t.bigint "turn_id"
    t.string "scenario"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["place_id"], name: "index_battles_on_place_id"
    t.index ["turn_id"], name: "index_battles_on_turn_id"
    t.index ["winner_id"], name: "index_battles_on_winner_id"
  end

  create_table "battles_warbands", id: false, force: :cascade do |t|
    t.bigint "battle_id", null: false
    t.bigint "warband_id", null: false
    t.index ["battle_id"], name: "index_battles_warbands_on_battle_id"
    t.index ["warband_id"], name: "index_battles_warbands_on_warband_id"
  end

  create_table "links", id: false, force: :cascade do |t|
    t.bigint "place_id"
    t.bigint "linked_place_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["linked_place_id", "place_id"], name: "index_links_on_linked_place_id_and_place_id", unique: true
    t.index ["linked_place_id"], name: "index_links_on_linked_place_id"
    t.index ["place_id", "linked_place_id"], name: "index_links_on_place_id_and_linked_place_id", unique: true
    t.index ["place_id"], name: "index_links_on_place_id"
  end

  create_table "places", force: :cascade do |t|
    t.string "namn"
    t.string "beskrivning"
    t.float "lat"
    t.float "lng"
    t.bigint "warband_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["warband_id"], name: "index_places_on_warband_id"
  end

  create_table "places_warbands", id: false, force: :cascade do |t|
    t.bigint "place_id", null: false
    t.bigint "warband_id", null: false
    t.index ["place_id"], name: "index_places_warbands_on_place_id"
    t.index ["warband_id"], name: "index_places_warbands_on_warband_id"
  end

  create_table "spelares", force: :cascade do |t|
    t.string "namn"
    t.string "password"
    t.boolean "admin"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "turns", force: :cascade do |t|
    t.integer "nummer"
    t.string "fas"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "warbands", force: :cascade do |t|
    t.string "namn"
    t.string "typ"
    t.string "colour"
    t.bigint "place_id"
    t.bigint "spelare_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["place_id"], name: "index_warbands_on_place_id"
    t.index ["spelare_id"], name: "index_warbands_on_spelare_id"
  end

  add_foreign_key "actions", "places"
  add_foreign_key "actions", "turns"
  add_foreign_key "actions", "warbands"
  add_foreign_key "battles", "places"
  add_foreign_key "battles", "turns"
  add_foreign_key "links", "places"
end
