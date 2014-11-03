$(window).on('load', function(){

	SC.initialize({
		// client_id: "58dfe88109fa90d78bd48175c157199d",
		client_id: "9eb06ad38e248d5444a8f7b12669840a",
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
SC.get('/tracks', { q: $('input.search').val(), limit: '24' }, function(tracks) {
	tracks.forEach(function(track,index){
		SC.oEmbed(track['permalink_url'], { maxheight: '150', maxwidth: '200'}, function(embed) {
			var template = _.template($('#sc_template').html());
			var image = track.artwork_url || track.user.avatar_url;
			var li = template({url: track.permalink_url, image: image, title: track.title, artist: track.user.username, stream: track.uri, embed: embed.html});
			$('ul#results').append(li);
			$('input.search').val('');
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
					soundCollection.create(data);
				})
			}
		});
	});
});
});

$('ul#results').sortable();

var current1 = {
	sound: null
};

var current2 = {
	sound: null
};

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

		if (current1.sound != null){
			current1.sound.destruct();
		}

		SC.stream($(stream).attr('id'), function(sound1){	
			var playing1 = false;
			$('.transport1.glyphicon-play').on('click', function(){

				if (playing1 == false) {
					current1.sound = sound1;
					current1.sound.play();
					$('.transport1.glyphicon-play').css('color', 'rgba(0, 255, 255, 0.5)');
					playing1 = true;
					$('.deck_left').addClass('spinning')
				}
			});
			$('.transport1.glyphicon-pause').on('click', function(){
				if (playing1 == true) {
					current1.sound.pause();
					$('.transport1.glyphicon-play').css('color', '#000');
					playing1 = false
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

		if (current2.sound != null){
			current2.sound.destruct();
		}

		SC.stream($(stream).attr('id'), function(sound2){
			var playing2 = false;

				$('.transport2.glyphicon-play').on('click', function(){
					if (playing2 == false) {
						current2.sound = sound2;
						current2.sound.play();
						$('.transport2.glyphicon-play').css('color', 'rgba(0, 255, 255, 0.5)');
						playing2 = true;
						$('.deck_right').addClass('spinning');
					}
				});
				$('.transport2.glyphicon-pause').on('click', function(){
					if (playing2 == true) {
						current2.sound.pause();
						$('.transport2.glyphicon-play').css('color', '#000');
						playing2 = false;
						$('.deck_right').removeClass('spinning')
					}
				});
			})
	}
})

});