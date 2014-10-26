class SessionController < ApplicationController

	def index
		if session[:user_id]
			@user = User.find(session[:user_id])
		end
		render :index
	end

	def destroy
		reset_session
		redirect_to '/'
	end
end