$(window).on('load', function(){

	SC.initialize({
		client_id: "9eb06ad38e248d5444a8f7b12669840a",
		redirect_uri: "/soundcloud.html",
	});

	$('i.glyphicon-search').on('click', function(){

// list of images and urls
// 	SC.get('/tracks', {q: $('input#search').val(), bpm: { from: 120} }, function(tracks) {
// 		console.log(tracks)
// 		tracks.forEach(function(track){
// 			$('ul#results').append('<li><img src=\"' + track.artwork_url + '\">' + track.uri + '</li>')
// 		});
// 	});
// });

// 	$('button#stream').on('click', function(){
// 		SC.stream("/tracks/" + $('input#stream').val(), function(sound){
// 			$('#play').on('click', function(){
// 				sound.play();
// 				$('#pause').on('click', function(){
// 					sound.pause();
// 				});
// 			});
// 		});
// 	});
// });

//if image, else soundcloud logo


// list of widgets
		SC.get('/tracks', { q: $('input.search').val(), limit: '12' }, function(tracks) {
			tracks.forEach(function(track){
				// console.log(track['permalink_url'])
				SC.oEmbed(track['permalink_url'], { maxheight: '125', maxwidth: '350'}, function(embed) {
					$('ul#results').append('<li class=\"results\">' + embed['html'] + '<button class=\"save btn-sm\">SAVE</button></li>')
				});
			});

		});

	});
});