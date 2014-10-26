var RecloudApp = RecloudApp || { Models: {}, Views: {}, Collections: {} };

RecloudApp.initialize = function(){
	var modalView = new RecloudApp.Views.ModalView({ el: $('#loginModal')});
}

$(function(){
	RecloudApp.initialize();

});