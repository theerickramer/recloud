class SoundsController < ApplicationController

	def create
		sound = Sound.create({url: params[:url], user_id: params[:user_id]})
		respond_to do |format|
			format.json { render :json => sound }
		end
	end

end