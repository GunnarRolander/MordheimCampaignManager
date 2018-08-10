class CreateActions < ActiveRecord::Migration[5.2]
  def change
    create_table :actions do |t|
      t.string :typ
      t.references :turn, foreign_key: true
      t.references :warband, foreign_key: true
      t.references :place, foreign_key: true

      t.timestamps
    end
  end
end
