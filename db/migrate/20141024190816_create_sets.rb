class CreateSets < ActiveRecord::Migration
  def change
    create_table :sets do |t|
    	t.integer :user_id
    end
  end
end
