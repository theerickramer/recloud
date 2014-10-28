var RecloudApp = RecloudApp || { Models: {}, Views: {}, Collections: {}, Routers: {} };

RecloudApp.Views.SoundList = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, 'add', this.render);
	},

	render: function(){
		var self = this;
		this.$el.empty();
		_.each(this.collection.models, function(model){
			var sound = new RecloudApp.Views.Sound({model: model});
			console.log(sound)
			self.$el.append(sound.render().el);
		})
	}
});