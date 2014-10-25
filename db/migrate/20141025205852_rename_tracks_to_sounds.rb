class RenameTracksToSounds < ActiveRecord::Migration
  def change
  	rename_table :tracks, :sounds
  end
end
