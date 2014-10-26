class UsersController < ApplicationController

	def index 
		user = User.find_by(user_name: params[:user_name])
		if user && user.authenticate(params[:password])
			session[:user_id] = user.id
			respond_to do |format|
				format.json { render :json => user } 
			end
		else
			respond_to do |format|
				format.json { render :json => {status: 'Invalid user / password'} } 
			end
		end
	end

	def create
		if User.find_by(user_name: params[:user_name])
			respond_to do |format|
				format.json { render :json => { status: 'User already exists'} } 
			end
		else
			user = User.create({ user_name: params[:user_name], password: params[:password]})	

			respond_to do |format|
				format.json { render :json => user } 
			end
		end
	end

end