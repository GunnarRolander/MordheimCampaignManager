class CreateBattles < ActiveRecord::Migration[5.2]
  def change
    create_table :battles do |t|
      t.references :winner, foreign_key: false
      t.references :place, foreign_key: true
      t.references :turn, foreign_key: true
      t.string :scenario

      t.timestamps
    end
  end
end
