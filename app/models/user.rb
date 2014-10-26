class User < ActiveRecord::Base
	has_many :sounds
	has_many :sets
	has_secure_password
end