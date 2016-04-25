var $video = $('#video-player');
var $vidContainer = $("#video-container");
var $playButton = $('#play-pause');
var $muteButton = $('#mute');
var $volumeSlider = $('#volume-slider');
var $fullScreen = $('#full-screen');
var $progress = $('#progress-bar');
var $timeBar = $('#time-bar');
var $bufferBar = $('#buffer-bar');
var $duration = $('#duration');
var $controls =$('#wrapper');
var $capToggle = $('#cc-on-off');
var $speedToggle = $('#speed');

$playButton.click(function () { 
  if ($video.get(0).paused){ 
      $video.get(0).play(); 
      $('.play-btn').hide();
      $('.pause-btn').show();   
    } else{
      $video.get(0).pause(); 
      $('.pause-btn').hide();
      $('.play-btn').show();
    }
  });

$muteButton.click(function () { 
  if($video[0].muted === false){ 
    $video[0].muted = true; //mutes the video
      $('.mute-btn').hide();
      $('.volume-btn').show();
      $volumeSlider[0].value = 0;    
  } else {
    $video[0].muted = false; //gives sound to the video
      $('.volume-btn').hide();
      $('.mute-btn').show();
      $volumeSlider[0].value = 1;
    }
  });

$volumeSlider.on("change", function(){ 
  $video[0].volume = $volumeSlider[0].value;
});

/* Toggle Speed Button */
$speedToggle.click(function() {
  toggleSpeed();
});

function toggleSpeed() {
  if($video[0].playbackRate === 1) {
    $video[0].playbackRate = 1.5;
    $speedToggle.text("1.5x");
  } else if ($video[0].playbackRate === 1.5) {
    $video[0].playbackRate = 1;
    $speedToggle.text("1.0x");        
  } 
}

/* Toggle CC Button */   
var vid = document.getElementById('video-player'); 
var track = vid.addTextTrack('subtitles', 'English', 'en');
track.mode = 'hidden';

track.addCue(new VTTCue(0.1, 3.9, "Now that we've looked at the architecture of the internet, let's see how you might"));
track.addCue(new VTTCue(4, 6.9, "connect your personal devices to the internet inside your house."));
track.addCue(new VTTCue(7, 10.9, "Well there are many ways to connect to the internet, and"));
track.addCue(new VTTCue(11, 12.9, "most often people connect wirelessly."));
track.addCue(new VTTCue(13, 16.9, "Let's look at an example of how you can connect to the internet."));
track.addCue(new VTTCue(17, 21.9, "If you live in a city or a town, you probably have a coaxial cable for"));
track.addCue(new VTTCue(22, 25.9, "cable Internet, or a phone line if you have DSL, running to the outside of"));
track.addCue(new VTTCue(26, 31.9, "your house, that connects you to the Internet Service Provider, or ISP."));
track.addCue(new VTTCue(32, 33.9, "If you live far out in the country, you'll more likely have"));
track.addCue(new VTTCue(34, 38.9, "a dish outside your house, connecting  you wirelessly to your closest ISP, or"));
track.addCue(new VTTCue(39, 41.9, "you might also use the telephone system."));
track.addCue(new VTTCue(42, 45.9, "Whether a wire comes straight from the ISP hookup outside your house, or "));
track.addCue(new VTTCue(46, 48.9, "it travels over radio waves from your roof,"));
track.addCue(new VTTCue(49, 52.9, "the first stop a wire will make once inside your house, is at your modem."));
track.addCue(new VTTCue(53, 56.9, "A modem is what connects the internet to your network at home."));
track.addCue(new VTTCue(57, 59, "A few common residential modems are DSL or"));

$capToggle.click(function() {
  if (track.mode == 'hidden') {
        track.mode = 'showing';
        $('.cc-btn-on').hide();
        $('.cc-btn-off').show();     
    } else {
        track.mode = 'hidden';
        $('.cc-btn-off').hide();
        $('.cc-btn-on').show();
    }
});

/* Toggle Full Screen Button */
$fullScreen.click(function() {
    toggleFullScreen();
  });
  
  function toggleFullScreen() {
   var videoDiv = document.getElementById('video-container');
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
      if (videoDiv.requestFullscreen) {
        videoDiv.requestFullscreen();
      } else if (videoDiv.msRequestFullscreen) {
        videoDiv.msRequestFullscreen();
      } else if (videoDiv.mozRequestFullScreen) {
        videoDiv.mozRequestFullScreen();
      } else if (videoDiv.webkitRequestFullscreen) {
        videoDiv.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }


/* Progress Bar */
$video[0].addEventListener('loadedmetadata', function() {
   $progress[0].setAttribute('max', $video[0].duration);
});
$video[0].addEventListener('timeupdate', function() {
   $progress[0].value = $video[0].currentTime;
   $timeBar[0].style.width = Math.floor(($video[0].currentTime / $video[0].duration) * 100) + '%';
});
$video[0].addEventListener('timeupdate', function() {
   if (!$progress[0].getAttribute('max')) $progress[0].setAttribute('max', $video[0].duration);
   $progress[0].value = $video[0].currentTime;
   $timeBar[0].style.width = Math.floor(($video[0].currentTime / $video[0].duration) * 100) + '%';
});

/* Function to update the buffer bar */
  //loop to get HTML5 video buffered data
    var startBuffer = function() {
    var currentBuffer = $video[0].buffered.end(0);
    var maxduration = $video[0].duration;
    var perc = 100 * (currentBuffer / maxduration);
    $('#buffer-bar').css('width',perc+'%');
    
    if(currentBuffer < maxduration) {
      setTimeout(startBuffer, 500);
    }
  };  
      setTimeout(startBuffer, 500); 

/* Use ONLY to manually check if buffer start and end value */
function bufferedBar() { 
    alert("Start: " + $video[0].buffered.start(0) + " End: "  + $video[0].buffered.end(0));
} 

/* Skip Ahead */
$video.bind("timeupdate", videoTimeUpdateHandler);
$progress.mousedown(progressMouseDown);
        
        function videoTimeUpdateHandler(e) {
            var video = $video.get(0);
            var percent = video.currentTime / video.duration;
            updateProgressWidth(percent);
        }
        
        function progressMouseDown(e) {
            var $this = $(this);
            var x = e.pageX - $this.offset().left;
            var percent = x / $this.width();
            updateProgressWidth(percent);
            updateVideoTime(percent);
        }
        
        function updateProgressWidth(percent) {
            $timeBar.width((percent * 100) + '%');
        }
        
        function updateVideoTime(percent) {
            var video = $video.get(0);
            video.currentTime = percent * video.duration;
        }

/* Hide controls bar */
$vidContainer.mouseenter(function () {
      $controls.fadeIn(500);
      // track.mode = 'hidden';
    });
$vidContainer.mouseleave(function () {
      $controls.fadeOut(500);
      // track.mode = 'showing';
    });

/* Update currentTime and duration */
$video.on("timeupdate", function() {
  var $videoTime = $video[0].currentTime;
  if ($videoTime < 9.5) {
    $duration.html('00:0' + Math.floor($videoTime) + ' / 00:59');   
  } else {
    $duration.html('00:' + Math.floor($videoTime) + ' / 00:59');      
  }
});

/* Setup for Text Highlight*/
function secondsFromTimespan(timeSpan) {
    if(!timeSpan || !timeSpan.indexOf(':')) return 0;
    var parts = timeSpan.split(':');
    return +parts[0] * 60 + +parts[1];
}

function constructIntervals(transcripts) {
    var intervals = [];
    for(var i = 0; i < transcripts.length; i++) {
        if(i == transcripts.length - 1) {
            intervals.push({
                lowerBound: secondsFromTimespan($(transcripts[i]).attr('data-start-time')),
                upperBound: Math.floor($video[0].duration),
                transcript: transcripts[i] // current transcript
            });
        } else {
            intervals.push({
                lowerBound: secondsFromTimespan($(transcripts[i]).attr('data-start-time')),
                upperBound: secondsFromTimespan($(transcripts[i + 1]).attr('data-start-time')),
                transcript: transcripts[i] // current transcript
            });
        }

    }
    return intervals;
}

function isTimeWithinInterval(interval, currentTime) {
    var lowerBoundSeconds = interval.lowerBound;
    var upperBoundSeconds = interval.upperBound;
    return lowerBoundSeconds <= currentTime && currentTime < upperBoundSeconds;
}

/* Highlight Text from Video */
$(function () {
    var transcripts = $('span[data-start-time]');
    var intervals = constructIntervals(transcripts);
    $video[0].addEventListener('timeupdate', function () {
        $('span[data-start-time]').removeClass('highlight');
        for(var i = 0; i < intervals.length; i++) {
            if(isTimeWithinInterval(intervals[i], $video[0].currentTime)) {
                $(intervals[i].transcript).addClass('highlight');
            }
        }
    });

});


/* Click on transcript to be taken to that time in the video */
$("span").click(function() {
  var transcriptTime = $(this).attr("data-start-time");
  $video[0].currentTime = secondsFromTimespan(transcriptTime);
});





  

