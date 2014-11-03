var RecloudApp = RecloudApp || { Models: {}, Views: {}, Collections: {}, Routers: {} };

RecloudApp.Views.Sound = Backbone.View.extend({
	tagName: 'li',
	className: 'results',
	template: _.template($('#sound_template').html() ),

	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy remove', this.remove);
	},

	events: {
		'click .delete' : 'deleteSound'
	},

	deleteSound: function(){
		this.model.destroy();
	},

	render: function(){
		this.$el.html(this.template(this.model.attributes));
		return this
	}
});	