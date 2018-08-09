class CreateLinks < ActiveRecord::Migration[5.2]
  def change
    create_table :links, id: false do |t|
      t.references :place, foreign_key: true
      t.references :linked_place

      t.timestamps
    end

    add_index(:links, [:place_id, :linked_place_id], :unique => true)
    add_index(:links, [:linked_place_id, :place_id], :unique => true)
  end
end
