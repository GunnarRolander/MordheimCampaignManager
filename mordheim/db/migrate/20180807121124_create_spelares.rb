class CreateSpelares < ActiveRecord::Migration[5.2]
  def change
    create_table :spelares do |t|
      t.string :namn
      t.string :password
      t.boolean :admin

      t.timestamps
    end
  end
end
