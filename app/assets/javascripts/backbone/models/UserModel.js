var RecloudApp = RecloudApp || { Models: {}, Views: {}, Collections: {}, Routers: {} };

RecloudApp.Models.Users = Backbone.Model.extend({
	urlRoot: '/users'
})