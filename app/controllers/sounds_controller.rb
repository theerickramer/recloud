class SoundsController < ApplicationController

	def create
		sound = Sound.create({artist: params[:artist], title: params[:title], image: params[:image], embed: params[:embed], stream: params[:stream],url: params[:url], user_id: params[:user_id]})
		respond_to do |format|
			format.json { render :json => sound }
		end
	end

end