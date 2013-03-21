function BackgroundIntensity(audioContext) {
  var self = this;
  this.audioContext = audioContext;
  // buttonElement.addEventListener('click', function() {
  //   context.playPause.call(context);
  // });

  // rangeElement.addEventListener('change', function(e) {
  //   var value = parseInt(e.target.value);
  //   var max = parseInt(e.target.max);
  //   context.setIntensity(value / max);
  // });

  var sources = ['ost/maman0.wav', 'ost/maman1.wav','ost/maman2.wav','ost/maman3.wav'];

  // Load all sources.
  var ctxAudio = this;

  loader = new BufferLoader(audioContext, sources, onLoaded);
  loader.load();

  function onLoaded(buffers) {
    // Store the buffers.
    ctxAudio.buffers = buffers;
    finishedLoading();
  }

  this.sources = new Array(sources.length);
  this.gains = new Array(sources.length);
}



BackgroundIntensity.prototype.playPause = function() {
  if (this.playing) {
    // Stop all sources.
    for (var i = 0, length = this.sources.length; i < length; i++) {
      var src = this.sources[i];
      src.noteOff(0);
    }
  } else {
    var targetStart = this.audioContext.currentTime + 0.1;
    // Start all sources simultaneously.
    for (var i = 0, length = this.buffers.length; i < length; i++) {
      this.playSound(i, targetStart);
    }
    this.setIntensity(0);
  }
  this.playing = !this.playing;
}



BackgroundIntensity.prototype.setIntensity = function(normVal) {
  //var value = normVal * (this.gains.length - 1);
  
  // First reset gains on all nodes.
  for (var i = 0; i < this.gains.length; i++) {
    this.gains[i].gain.value = 0;
  }


  for (var i = 0; i <= normVal; i++) {
    this.gains[i].gain.value = 1;
  }

  // // Decide which two nodes we are currently between, and do an equal
  // // power crossfade between them.
  // var leftNode = Math.floor(value);
  // // Normalize the value between 0 and 1.
  // var x = value - leftNode;
  // var gain1 = Math.cos(x * 0.5*Math.PI);
  // var gain2 = Math.cos((1.0 - x) * 0.5*Math.PI);
  // console.log(gain1, gain2);
  // // Set the two gains accordingly.
  // this.gains[leftNode].gain.value = gain1;
  // // Check to make sure that there's a right node.
  // if (leftNode < this.gains.length - 1) {
  //   // If there is, adjust its gain.
  //   this.gains[leftNode + 1].gain.value = gain2;
  // }
}



BackgroundIntensity.prototype.playSound = function(index, targetTime) {
  var buffer = this.buffers[index];
  var source = this.audioContext.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  var gainNode = this.audioContext.createGainNode();
  // Make a gain node.
  source.connect(gainNode);
  gainNode.connect(this.audioContext.destination);
  // Save the source and gain node.
  this.sources[index] = source;
  this.gains[index] = gainNode;
  source.noteOn(targetTime);
}