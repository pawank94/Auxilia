(function(w){
	var button=$('.button'),
		isListening=false,
		context=document.getElementById('spectrum').getContext('2d');
	annyang.setLanguage('en-IN');
	/*sleep mode function*/
	function sleep(route){
		$.post(route)
            .fail(function (jqXHR) {
              if (jqXHR.status === 0) return alert('Can\'t connect to server')
              alert(jqXHR.responseJSON.error)
            });
	}
	function post(route) {
		console.log('here');
		var time = setTimeout(function(){
			console.log('here');
			sleep(route);
		},30000);
        if (confirm('Please confirm Sleep mode.No response will trigger sleep in 30 seconds.')) {
          sleep(route);
        }
        else{
        	console.log('x');
        	clearTimeout(time);
        	window.location.reload();
        }
    }
	var commands={
		'start':function(){
			func.activateModule();
			func.prepare();
			$('.listening').removeClass('hide');
			$('.listening').addClass('blip-animation');
		},
		'stop':function(){
			func.prepare();
			func.deactivateModule();
			$('.ntext').addClass('hide');
		},
		'standby mode':function(){
			console.log('standby');
			func.prepare();
			$('body').removeClass('remove-overflow');
			$('.scroll-notification').addClass('hide');
			if($('.scroll-notification').hasClass('animate'))
				$('.scroll-notification').removeClass('animate');
			$('.standby-notification').removeClass('hide');
			$('.standby-notification').addClass('animate');
			standbyModeIsActive=true;
		},
		'sleep mode':function(){
			post('/sleep');
		},
		'scroll mode':function(){
			console.log('scroll');
			func.prepare();
			window.scrollDemoIsActive = true;
			$('body').addClass('remove-overflow');
			$('.standby-notification').addClass('hide');
			if($('.standby-notification').hasClass('animate'))
				$('.standby-notification').removeClass('animate');
			$('.scroll-notification').removeClass('hide');
			$('.scroll-notification').addClass('animate');
		},
		'music mode' : function(){
			func.prepare();
			if($('.music-notification').hasClass('animate'))
				$('.music-notification').removeClass('animate');
			$('.music-notification').removeClass('hide');
			$('.music-notification').addClass('animate');
			thereminDemoIsActive=true;
		}
	};
	var func = {
		prepare:function(){
			$(window).scrollTop(0);
			$('body').removeClass('remove-overflow');
			$('.ntext').removeClass('animate');
			$('.ntext').addClass('hide');
			standbyModeIsActive=false;
			thereminDemoIsActive=false;
			scrollDemoIsActive=false;
		},
		toggleModule:function(){
			if(isListening)
				func.deactivateModule();
			else
				func.activateModule();
		},
		activateModule:function(){
			isListening=true;
			func.prepare();
			annyang.start();
			$('.ring').addClass('animate-ring');
			$('.ntext').removeClass('hide');
			$('.listening').removeClass('hide');
			$('.listening').addClass('blip-animation');
		},
		deactivateModule:function(){
			func.prepare();
			isListening=false;
			/*allfalse*/
			window.scrollDemoIsActive = false;
			/*all false*/
			$('body').removeClass('remove-overflow');
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
	var count=0;
	$('body').on('webkitfullscreenchange',function(){
		count++;
      	if(count%2==0)
      	{
      		$('.ring').addClass('animate-ring');
		    $('.permission').removeClass('animate-permission');
		    $('#standby-div').removeClass('standby-div-active');
		    $('.permission').addClass('hide');
      	}
  	});
	annyang.addCommands(commands);
	func.deactivateModule();
	func.prepareCanvas();
	button.on('click',func.toggleModule);
})(window);
