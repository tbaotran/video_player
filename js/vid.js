var $video = $("#video-player");
var $vidContainer = $("#video-container");
var $playButton = $("#play-pause");
var $muteButton = $("#mute");
var $volumeSlider = $("#volume-slider");
var $fullScreen = $("#full-screen");
var $progress = $('#progress');
var $progressBar = $('#progress-bar');
var $duration = $("#duration");
var $controls =$('#wrapper');
var $subtitles = $('#subtitles');

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
      $volumeSlider[0].value = .8;
    }
  });

$volumeSlider.on("change", function(){ 
  $video[0].volume = $volumeSlider[0].value;
});

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
   $progressBar[0].style.width = Math.floor(($video[0].currentTime / $video[0].duration) * 100) + '%';
});
$video[0].addEventListener('timeupdate', function() {
   if (!$progress[0].getAttribute('max')) $progress[0].setAttribute('max', $video[0].duration);
   $progress[0].value = $video[0].currentTime;
   $progressBar[0].style.width = Math.floor(($video[0].currentTime / $video[0].duration) * 100) + '%';
});

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
            $progressBar.width((percent * 100) + "%");
        }
        
        function updateVideoTime(percent) {
            var video = $video.get(0);
            video.currentTime = percent * video.duration;
        }

/* Hide controls bar */
$vidContainer.mouseenter(function () {
      $controls.fadeIn(500);
    }),
$vidContainer.mouseleave(function () {
      $controls.fadeOut(500);
    });

/* Update currentTime and duration */
$video.on("timeupdate", function() {
  var $videoTime = $video[0].currentTime;
  if ($videoTime < 9.5) {
    $duration.html("00:0" + Math.round($videoTime) + " / 00:59");   
  } else {
    $duration.html("00:" + Math.round($videoTime) + " / 00:59");      
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
    var transcripts = $("span[data-start-time]");
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
