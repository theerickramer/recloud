class ChangeUserIdToIntegerInSounds < ActiveRecord::Migration
  def change
  	remove_column :sounds, :user_id
  	add_column :sounds, :user_id, :integer
  end
end
