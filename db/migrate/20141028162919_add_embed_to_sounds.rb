class AddEmbedToSounds < ActiveRecord::Migration
  def change
  	add_column :sounds, :embed, :varchar
  end
end
