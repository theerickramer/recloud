var RecloudApp = RecloudApp || { Models: {}, Views: {}, Collections: {} };

RecloudApp.initialize = function(){
	var modalView = new RecloudApp.Views.ModalView({ el: $('#loginModal')});
}

$(function(){
	RecloudApp.initialize();

$('input.search').on('keyup', function(e){
	if (e.keyCode == 13){
		$('i.glyphicon-search').trigger('click')
	} 
})

$('.glyphicon-search').on('click', function(){
	
})

$('ul.nav').on('click', function(event){
	$('.active').toggleClass('active')
	$(event.target).parent().toggleClass('active');
})

}); // end
