class User < ActiveRecord::Base
	has_many :tracks
	has_many :sets
end