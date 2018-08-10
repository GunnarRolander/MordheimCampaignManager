class CreateWarbandsPlacesJoinTable < ActiveRecord::Migration[5.2]
  def change
    create_join_table :places, :warbands do |t|
      t.index :place_id
      t.index :warband_id
    end
  end
end
