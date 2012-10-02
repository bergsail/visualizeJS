var context = new webkitAudioContext(),
  audioFiles = [
    'music/step0.ogg',
    'music/step1.ogg',
    'music/step2.ogg',
    'music/step3.ogg'
  ],
  audioSteps = [];

var bufferLoader = new BufferLoader(context, audioFiles, onAudioLoaded);
bufferLoader.load();


function onAudioLoaded(bufferList) {
  createRings();
  setInterval(createRings, 215);

  for(var i = 0; i<bufferList.length; i++) {
    var bufferSource = context.createBufferSource();
    bufferSource.buffer = bufferList[i];
    bufferSource.looping = true;
    var gainNode = context.createGainNode();
    bufferSource.connect(gainNode);
    gainNode.connect(context.destination);
    gainNode.gain.value = trackVolumes['volume' + i];

    car audioElem = {
      source: bufferSource,
      gainNode: gainNode
    }

    audioSteps.push(audioElem);
  }

  for(var j=0;j<audioSteps.length; j++) {
    audioSteps[j].source.noteOn(0);
  }
}

var counter = 0;
function createRings() {
  counter +=1;
  for(var i=0;i<4;i++) {
    var vol = trackVolumes['volume' +i],
      perc = Math.max( 1, Math.round((1 - vol) * 10) - 2);
    if(vol>0) {
      window.createRing(i);
    }
    else if ( counter % perc == 0) {
      window.createRing(i);
    }
  }
}

window.createRing = function(index) {
  var ring = new Path.Circle(new Point(100 + (index * 125), 100), 50);
  ring.strokeColor = colors[index];
  ring.strokeWidth = 10;
  ring.position = circles[index].position;
  ring.opacity = trackVolumes['volume' + index];
  rings.push(ring);
}