class BattlesWarbands < ActiveRecord::Migration[5.2]
  def change
    create_join_table :battles, :warbands do |t|
      t.index :warband_id
      t.index :battle_id
    end
  end
end
