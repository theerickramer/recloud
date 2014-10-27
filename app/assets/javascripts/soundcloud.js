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
				console.log(track)
				SC.oEmbed(track['permalink_url'], { maxheight: '100', maxwidth: '250'}, function(embed) {
					var template = _.template($('#sc_template').html());
					var image = track.artwork_url || track.user.avatar_url;
					var li = template({image: image, embed: embed['html'], stream: track['stream_url']});
					$('ul#results').append(li)
				});
			});
		});

		$('ul#results').on('click', function(event){
			if (event.target.id != 'results') {
				var user_id = $('.user').attr('id');
				$.ajax({url: 'http://localhost:3000/users/' + user_id + '/sounds', type: 'POST', data: {url: event.target.id} });
			}
		})

	});
});