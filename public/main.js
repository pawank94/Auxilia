(function(w){
	var button=$('.button'),
		isListening=false,
		context=document.getElementById('spectrum').getContext('2d'),
		introCounter=false;
	/*scroll functions*/
	window.sr = ScrollReveal({ reset: true ,origin: 'bottom',distance: '50px',duration: 1000,rotate: { x: 45, y: 45, z: 45 },});
	sr.reveal('.scroll-text',500);
	/*******************/
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
			window.location.reload();
			$('.ntext').addClass('hide');
		},
		'standby mode':function(){
			if(isListening=true){
				console.log('standby');
				func.prepare();
				$('body').removeClass('remove-overflow');
				$('.scroll-notification').addClass('hide');
				if($('.scroll-notification').hasClass('animate'))
					$('.scroll-notification').removeClass('animate');
				$('.standby-notification').removeClass('hide');
				$('.standby-notification').addClass('animate');
				standbyModeIsActive=true;
			}
		},
		'sleep mode':function(){
			if(isListening=true){
				post('/sleep');
			}
		},
		'scroll mode':function(){
			if(isListening=true){
				console.log('scroll');
				func.prepare();
				window.scrollDemoIsActive = true;
				$('body').addClass('remove-overflow');
				$('.standby-notification').addClass('hide');
				if($('.standby-notification').hasClass('animate'))
					$('.standby-notification').removeClass('animate');
				$('.scroll-notification').removeClass('hide');
				$('.scroll-notification').addClass('animate');
			}
			
		},
		'music mode' : function(){
			if(isListening=true){
				func.prepare();
				if($('.music-notification').hasClass('animate'))
					$('.music-notification').removeClass('animate');
				$('.music-notification').removeClass('hide');
				$('.music-notification').addClass('animate');
				thereminDemoIsActive=true;
			}
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
			if(!introCounter)
			{
				introCounter=true;
				$('.intro').removeClass('hide');
			}
			isListening=true;
			func.prepare();
			annyang.start();
			$('#mic').addClass('mic-animation');
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
			$('#mic').removeClass('mic-animation');
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
      		$('#mic').addClass('mic-animation');
      		$('.ring').addClass('animate-ring');
		    $('.permission').removeClass('animate-permission');
		    $('#standby-div').removeClass('standby-div-active');
		    $('.permission').addClass('hide');
      	}
  	});
	annyang.addCommands(commands);
	func.deactivateModule();
	func.prepareCanvas();
	annyang.start();
	button.on('click',func.toggleModule);
})(window);