class CreateWarbands < ActiveRecord::Migration[5.2]
  def change
    create_table :warbands do |t|
      t.string :namn
      t.string :typ
      t.references :place, foreign_key: false
      t.references :spelare, foreign_key: false

      t.timestamps
    end
  end
end
