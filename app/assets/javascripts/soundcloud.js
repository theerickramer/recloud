$(window).on('load', function(){

	SC.initialize({
		client_id: "58dfe88109fa90d78bd48175c157199d",
		// redirect_uri: "/soundcloud.html",
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
				SC.oEmbed(track['permalink_url'], { maxheight: '150', maxwidth: '220'}, function(embed) {
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

		$('ul#results').sortable()

		$('.deck').droppable({
			over: function(event, ui){
				$(this).parent().css('box-shadow', 'inset 0px 0px 50px 50px rgba(0, 255, 255, 0.5)');
			},

			out: function(event, ui){
				$(this).parent().css('box-shadow', '');
			},

			drop: function(event, ui){
				console.log('dropped')
				var img = ui.draggable.children()[0]
				$(this).parent().css('box-shadow', '');
				$(this).css('background-image', 'url(\"' + $(img).attr('src') + '\")')
			}
		})
	});
});