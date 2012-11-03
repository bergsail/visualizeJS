window.onload = function() {

	try {
	    context = new webkitAudioContext();
	  }
	  catch(e) {
	    alert('Web Audio API is not supported in this browser (use Chrome)');
	  }

	var context = new webkitAudioContext(),
			buffer;


	var loadAudioFile = (function (url) {
    var request = new XMLHttpRequest();

    request.open('get', 'sound/step0.ogg', true);
    //request.open('get', 'sound/LMFAO_Party_Rock_Anthem_8Bit.mp3', true);
    request.responseType = 'arraybuffer';

    request.onload = function () {
            context.decodeAudioData(request.response,
                 function(incomingBuffer) {
                     playAudioFile(incomingBuffer);
                 }
            );
    };
    request.send();
	}());


	var playAudioFile = function (buffer) {
		createRings();
		setInterval(createRings, 215);
		
    var source = context.createBufferSource();
    source.buffer = buffer;
    buffer.looping = true;
    source.connect(context.destination);
    source.noteOn(0); // Play sound immediately
	};


	//Animations
	var counter = 0;
	function createRings() {
		counter += 1;
		for(var i = 0; i < 4; i++){
			var vol = 1,
				perc = Math.max( 1, Math.round((1 - vol) * 10) - 2 );
			if(vol > 0) {
				if(vol == 1){
					window.createRing(i);
				}
				else if(counter % perc == 0) {
					window.createRing(i);
				}
			}
		} 
	}


}