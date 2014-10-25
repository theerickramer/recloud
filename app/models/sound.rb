class Sound < ActiveRecord::Base
	belongs_to :user
	has_many :sets
end