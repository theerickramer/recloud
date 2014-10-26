var RecloudApp = RecloudApp || { Models: {}, Views: {}, Collections: {} }

RecloudApp.Models.Users = Backbone.Model.extend({
	urlRoot: '/users'
})