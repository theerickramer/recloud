class SoundsController < ApplicationController

	def index
		sounds = Sound.where(user_id: session[:user_id])
		respond_to do |format|
			format.json { render :json => sounds }
		end
	end

	def create
		sound = Sound.create({
			artist: params[:artist], 
			title: params[:title],
			image: params[:image],
			embed: params[:embed],
			stream: params[:stream],
			url: params[:url],
			user_id: session[:user_id]
			})
		respond_to do |format|
			format.json { render :json => sound }
		end
	end

	def destroy
		sound = Sound.find(params[:id])
		sound.destroy()
		respond_to do |format|
			format.json { render :json => sound }
		end
	end

end