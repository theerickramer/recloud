var RecloudApp = RecloudApp || { Models: {}, Views: {}, Collections: {} };

RecloudApp.Collections.Sound = Backbone.Collection.extend({
	model: RecloudApp.Models.Sound,
	url: '/sounds'
});