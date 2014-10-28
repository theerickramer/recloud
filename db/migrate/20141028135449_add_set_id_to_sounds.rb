class AddSetIdToSounds < ActiveRecord::Migration
  def change
  	add_column :sounds, :set_id, :integer
  end
end
