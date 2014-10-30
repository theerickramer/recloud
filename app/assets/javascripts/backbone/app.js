var RecloudApp = RecloudApp || { Models: {}, Views: {}, Collections: {}, Routers: {} };
var router;
var current_user;
var soundCollection;

RecloudApp.initialize = function(){
	var modalView = new RecloudApp.Views.ModalView({ el: $('#loginModal')});
	soundCollection = new RecloudApp.Collections.Sound();

	// router = new RecloudApp.Routers.Sound();

	// router.on("route:sounds", function(){
	// 	console.log('sounds')
	// 	var soundList = new RecloudApp.Views.SoundList({ el: $('ul.results'), collection: soundCollection})
	// })

	// Backbone.history.start()

	$('input.search').on('keyup', function(e){
		if (e.keyCode == 13){
			$('i.glyphicon-search').trigger('click')
		} 
	})

	$('ul.nav').on('click', function(event){
		$('.active').toggleClass('active')
		$(event.target).parent().toggleClass('active');
	})

	$('.glyphicon-music').on('click', function(){
		$('ul#results').empty()
		
		var soundList = new RecloudApp.Views.SoundList({ el: $('ul#results'), collection: soundCollection});
		soundList.render();
	})
}

$(function(){
	RecloudApp.initialize();

}); // end
