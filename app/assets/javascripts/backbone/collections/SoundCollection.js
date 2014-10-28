var RecloudApp = RecloudApp || { Models: {}, Views: {}, Collections: {}, Routers: {} };

RecloudApp.Collections.Sound = Backbone.Collection.extend({
	model: RecloudApp.Models.Sound,
	url: '/users/1/sounds'
});