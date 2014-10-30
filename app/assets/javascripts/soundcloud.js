$(window).on('load', function(){

	SC.initialize({
		// client_id: "58dfe88109fa90d78bd48175c157199d",
		client_id: "9eb06ad38e248d5444a8f7b12669840a",
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
	tracks.forEach(function(track,index){
		SC.oEmbed(track['permalink_url'], { maxheight: '150', maxwidth: '220'}, function(embed) {
			var template = _.template($('#sc_template').html());
			var image = track.artwork_url || track.user.avatar_url;
			var li = template({url: track.permalink_url, image: image, title: track.title, artist: track.user.username, stream: track.uri, embed: embed.html});
			$('ul#results').append(li);
			if (index == tracks.length - 1){
				$('button.save').on('click', function(){
					var user_id = $('.user').attr('id');
					var button = this;
					var li = $(this).closest('li')[0];
					var data = {
						artist: $(li).find('img').attr('id'),
						title: $(li).find('img').attr('class'),
						image: $(li).find('img').attr('src'),
						embed: $(li).find('.embed').html(),
						stream: button.id,
						url: li.id
					}
					$.ajax({url: '/users/' + user_id + '/sounds', type: 'POST', data: data });
				})
			}
		});
	});

});

$('ul#results').sortable();

var destroyPrevSound = function(sound){
		sound.destruct();
		console.log('fuck')
	}

$('.deck_left').droppable({
	over: function(event, ui){
		$(this).parent().css('box-shadow', 'inset 0px 0px 50px 50px rgba(0, 255, 255, 0.5)');
	},

	out: function(event, ui){
		$(this).parent().css('box-shadow', '');
	},

	drop: function(event, ui){
		var img = ui.draggable.children()[0];
		var stream = ui.draggable.children()[2];
		$(this).parent().css('box-shadow', '');
		$(this).css('background-image', 'url(\"' + $(img).attr('src') + '\")');	

		var currentSound;

		SC.stream($(stream).attr('id'), function(sound1){	
			var playing1 = false;
			$('.transport1.glyphicon-play').on('click', function(){
				destroyPrevSound(currentSound);

				if (playing1 == false) {
					currentSound = sound1;
					currentSound.play();
					playing1 = true;
					
					$('.deck_left').addClass('spinning')
				}
				return currentSound;
			});
			$('.transport1.glyphicon-pause').on('click', function(){
				if (playing1 == true) {
					sound1.pause();
					playing1 = false
					console.log(playing1)
					$('.deck_left').removeClass('spinning')
				}
			});
		});
	}
});

$('.deck_right').droppable({
	over: function(event, ui){
		$(this).parent().css('box-shadow', 'inset 0px 0px 50px 50px rgba(0, 255, 255, 0.5)');
	},

	out: function(event, ui){
		$(this).parent().css('box-shadow', '');
	},

	drop: function(event, ui){
		var img = ui.draggable.children()[0];
		var stream = ui.draggable.children()[2];
		$(this).parent().css('box-shadow', '');
		$(this).css('background-image', 'url(\"' + $(img).attr('src') + '\")');

		SC.stream($(stream).attr('id'), function(sound2){
			var playing2 = false;

				$('.transport2.glyphicon-play').on('click', function(){
					if (playing2 == false) {
						sound2.play();
						playing2 = true;
						console.log(playing2)
						$('.deck_right').addClass('spinning');
					}
				});
				$('.transport2.glyphicon-pause').on('click', function(){
					if (playing2 == true) {
						sound2.pause();
						playing2 = false;
						console.log(playing2)
						$('.deck_right').removeClass('spinning')
					}
				});
			})
	}
})
});
});