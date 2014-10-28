class AddInfoToSounds < ActiveRecord::Migration
  def change
  	add_column :sounds, :image, :text
  	add_column :sounds, :stream, :varchar
  end
end
