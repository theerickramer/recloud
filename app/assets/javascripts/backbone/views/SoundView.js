var RecloudApp = RecloudApp || { Models: {}, Views: {}, Collections: {} };

RecloudApp.Views.Sound = Backbone.View.extend({

});	

var soundCollection = new RecloudApp.Collections.Sound();
var soundView = new RecloudApp.Views.Sound({ el: $('ul.results'), collection: soundCollection });