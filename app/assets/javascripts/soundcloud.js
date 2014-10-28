$(window).on('load', function(){

	SC.initialize({
		client_id: "58dfe88109fa90d78bd48175c157199d",
		// redirect_uri: "/soundcloud.html",
	});

	$('.glyphicon-music').on('click', function(){
	var soundCollection = new RecloudApp.Collections.Sound(); 
	var soundList = new RecloudApp.Views.SoundList({ el: $('ul.results'), collection: soundCollection})
})	

	$('i.glyphicon-search').on('click', function(){
		$('ul#results').empty()

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
					var li = template({url: track.permalink_url, image: image, title: track.title, artist: track.user.username, stream: track.uri, embed: embed.html});
					$('ul#results').append(li)
				});
			});
		});

		$('ul#results').on('click', function(event){
			if (event.target.id != 'results') {
				var user_id = $('.user').attr('id');
				var button = event.target;
				var widget = $(button).prev()[0];
				var data = {
					artist: $($(widget).prev()[0]).attr('id'),
					title: $($(button).children()[0]).attr('id'),
					image: $($(widget).prev()[0]).attr('src'),
					embed: $(widget).html(),
					stream: button.id,
					url: $($(button).parent()[0]).attr('id')
				}
				// $.ajax({url: '/users/' + user_id + '/sounds', type: 'POST', data: data });
				$.ajax({url: '/users/' + user_id + '/sounds', type: 'POST', data: data });
			}
		})

		$('ul#results').sortable();

		$('.deck_left').droppable({
			over: function(event, ui){
				$(this).parent().css('box-shadow', 'inset 0px 0px 50px 50px rgba(0, 255, 255, 0.5)');
			},

			out: function(event, ui){
				$(this).parent().css('box-shadow', '');
			},

			drop: function(event, ui){
				console.log(ui.draggable.children()[2])
				var img = ui.draggable.children()[0];
				var stream = ui.draggable.children()[2];
				$(this).parent().css('box-shadow', '');
				$(this).css('background-image', 'url(\"' + $(img).attr('src') + '\")');

				SC.stream($(stream).attr('id'), function(sound1){
					$('.transport1.glyphicon-play').on('click', function(){
							sound1.play();
							$('.deck_left').addClass('spinning')
						});
					$('.transport1.glyphicon-pause').on('click', function(){
							sound1.pause();
							$('.deck_left').removeClass('spinning')
					})
				})
			}
		})

		$('.deck_right').droppable({
			over: function(event, ui){
				$(this).parent().css('box-shadow', 'inset 0px 0px 50px 50px rgba(0, 255, 255, 0.5)');
			},

			out: function(event, ui){
				$(this).parent().css('box-shadow', '');
			},

			drop: function(event, ui){
				console.log(ui.draggable.children()[2])
				var img = ui.draggable.children()[0];
				var stream = ui.draggable.children()[2];
				$(this).parent().css('box-shadow', '');
				$(this).css('background-image', 'url(\"' + $(img).attr('src') + '\")');

				SC.stream($(stream).attr('id'), function(sound2){
					$('.transport2.glyphicon-play').on('click', function(){
							sound2.play();
							$('.deck_right').addClass('spinning')
						});
					$('.transport2.glyphicon-pause').on('click', function(){
							sound2.pause();
							$('.deck_right').removeClass('spinning')
					})
				})
			}
		})
	});
});