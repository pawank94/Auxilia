(function(w){
	var button=$('.button'),
		isListening=false,
		context=document.getElementById('spectrum').getContext('2d');
	var commands={
		'sleep mode':function(){
			console.log('sleep');
			$('.scroll-notification').addClass('hide');
			if($('.scroll-notification').hasClass('animate'))
				$('.scroll-notification').removeClass('animate');
			$('.sleep-notification').removeClass('hide');
			$('.sleep-notification').addClass('animate');
		},
		'scroll mode':function(){
			console.log('scroll');
			$('.sleep-notification').addClass('hide');
			if($('.sleep-notification').hasClass('animate'))
				$('.sleep-notification').removeClass('animate');
			$('.scroll-notification').removeClass('hide');
			$('.scroll-notification').addClass('animate');
		},
	};
	var func = {
		toggleModule:function(){
			if(isListening)
				func.deactivateModule();
			else
				func.activateModule();
		},
		activateModule:function(){
			isListening=true;
			annyang.start();
			$('.ring').addClass('animate-ring');
			// $("#button-voice").addClass('hide');
			// $("#button-mute").removeClass('hide');
			$('.ntext').removeClass('hide');
		},
		deactivateModule:function(){
			isListening=false;
			annyang.abort();
			$('.ring').removeClass('animate-ring');
			// $("#button-voice").removeClass('hide');
			// $("#button-mute").addClass('hide');
			$('.ntext').addClass('hide');
		},
		prepareCanvas:function(){
			navigator.getUserMedia_ = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
          	navigator.getUserMedia_({ audio: { optional: [{ echoCancellation: false }] } }, function(stream) {
            handleMic(stream, readMic);
            // Self-destruct!
            self.parentNode.removeChild(self);
          }, function() { console.log('Error!') });
		}
	};
	annyang.addCommands(commands);
	func.deactivateModule();
	func.prepareCanvas();
	button.on('click',func.toggleModule);
})(window);
