class CreatePlaces < ActiveRecord::Migration[5.2]
  def change
    create_table :places do |t|
      t.string :namn
      t.string :beskrivning
      t.float :lat
      t.float :lng
      t.references :warband, foreign_key: false

      t.timestamps
    end
  end
end
