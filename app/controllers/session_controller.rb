class SessionController < ApplicationController

	def index
		render :index
	end

	def destroy
		reset_session
		redirect_to '/'
	end
end