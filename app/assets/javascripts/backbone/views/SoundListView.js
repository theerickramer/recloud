var RecloudApp = RecloudApp || { Models: {}, Views: {}, Collections: {}, Routers: {} };

RecloudApp.Views.SoundList = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, 'change', this.render);
		this.collection.fetch();
	},

	render: function(){
		var self = this;
		_.each(this.collection.models, function(model){
			var sound = new RecloudApp.Views.Sound({model: model});
			self.$el.append(sound.render().el);
		})
	}
});