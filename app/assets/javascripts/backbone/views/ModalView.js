var RecloudApp = RecloudApp || { Models: {}, Views: {}, Collections: {}, Routers: {} };

RecloudApp.Views.ModalView = Backbone.View.extend({

	initialize: function(){
		this.render()
	},

	events: {
		'click .register' : 'newUser',
		'click .loginSubmit' : 'login',
		'click .close' : 'reset'
	},

	newUser: function(){
		var user_name = this.$el.find('input[name="user_name"]').val();
		var password = this.$el.find('input[name="password"]').val();
		
		var user = new RecloudApp.Models.Users({
			user_name: user_name,
			password: password
		})

		user.save().done(function(response){
			if (response.status == 'User already exists'){
				$('button.login').trigger('click')
				$('div.error').text(response.status)
			} else {
				console.log(response)
				$('.user').text('Greetings ' + response.user_name + '!')
			}
		});
	},

	login: function(){
		var user_name = this.$el.find('input[name="user_name"]').val();
		var password = this.$el.find('input[name="password"]').val();

		var user = new RecloudApp.Models.Users({
			user_name: user_name,
			password: password
		})

		user.fetch({data: {user_name: user_name, password: password} }).done(function(response){
			if (response.status == 'Invalid user / password'){
				$('button.login').trigger('click')
				$('div.error').text(response.status)
			} else {
				window.location.href = '/'
				// $('.user').text('Greetings, ' + response.user_name + '!')
			}
		})
	},

	reset: function(){
		this.$el.find('input[name="user_name"]').val('');
		this.$el.find('input[name="password"]').val('');
	}

});