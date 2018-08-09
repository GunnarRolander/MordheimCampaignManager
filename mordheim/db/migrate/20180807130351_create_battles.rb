class CreateBattles < ActiveRecord::Migration[5.2]
  def change
    create_table :battles do |t|
      t.references :attacker, foreign_key: {to_table: :warbands}
      t.references :defender, foreign_key: {to_table: :warbands}
      t.references :winner, foreign_key: {to_table: :warbands}
      t.references :place, foreign_key: true
      t.references :turn, foreign_key: true
      t.string :scenario

      t.timestamps
    end
  end
end
