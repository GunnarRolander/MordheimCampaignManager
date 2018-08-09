class CreateTurns < ActiveRecord::Migration[5.2]
  def change
    create_table :turns do |t|
      t.integer :nummer
      t.string :fas

      t.timestamps
    end
  end
end
