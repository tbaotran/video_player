var $vidContainer = $("#video-container");

var $video_controls =$('#video_controls_bar');

var vid, playbtn, seekslider, curtimetext, durtimetext, mutebtn, volumeslider, fullscreenbtn;

function initializePlayer() {
  // Set object references
  vid = document.getElementById("my_video");
  playbtn = document.getElementById("playpausebtn");
  seekslider = document.getElementById("seekslider");
  curtimetext = document.getElementById("curtimetext");
  durtimetext = document.getElementById("durtimetext");
  mutebtn = document.getElementById("mutebtn");
  volumeslider = document.getElementById("volumeslider");
  fullscreenbtn = document.getElementById("fullscreenbtn");
  // ccbtn = document.getElementById("ccbtn");

  // Add event listeners
  playbtn.addEventListener("click",playPause,false);
  seekslider.addEventListener("change",vidSeek,false);
  vid.addEventListener("timeupdate",seekTimeupdate,false);
  mutebtn.addEventListener("click",vidMute,false);
  volumeslider.addEventListener("change",setVolume,false);
  fullscreenbtn.addEventListener("click",toggleFullScreen,false);
  // ccbtn.addEventListener("click",toggleCaption,false);
}
window.onload = initializePlayer;

function playPause() {
    if(vid.paused) {
      vid.play();
      // playbtn.innerHTML = "Pause";
      $('.play-btn').hide();
      $('.pause-btn').show();  
    } else {
      vid.pause();
      // playbtn.innerHTML = "Play";
      $('.pause-btn').hide();
      $('.play-btn').show();
    }
} 

function vidSeek() {
    var seekto = vid.duration * (seekslider.value / 100);
    vid.currentTime = seekto;
}

function seekTimeupdate() {
    var newtime = vid.currentTime * (100 / vid.duration);
    seekslider.value = newtime;

    var curmins = Math.floor(vid.currentTime / 60);
    var cursecs = Math.floor(vid.currentTime - curmins * 60);
    var durmins = Math.floor(vid.duration / 60);
    var dursecs = Math.floor(vid.duration - durmins * 60);
    if(cursecs < 10) { cursecs = "0"+cursecs; }
    if(dursecs < 10) { dursecs = "0"+dursecs; }
    if(curmins < 10) { curmins = "0"+curmins; }
    if(durmins < 10) { durmins = "0"+durmins; }

    curtimetext.innerHTML = curmins+":"+cursecs;
    durtimetext.innerHTML = durmins+":"+dursecs;
}

function vidMute() {
    if(vid.muted) {
      vid.muted = false;
      // mutebtn.innerHTML = "Mute";
      $('.volume-btn').hide();
      $('.mute-btn').show();
      volumeslider.value = 100;
    } else {
      vid.muted = true;
      // mutebtn.innerHTML = "Unmute";
      $('.mute-btn').hide();
      $('.volume-btn').show();
      volumeslider.value = 0;
    }  
}

function setVolume() {
    vid.volume = volumeslider.value /100;
}

function toggleFullScreen() {
    if(vid.requestFullScreen) {
      vid.requestFullScreen();
    } else if(vid.webkitRequestFullScreen) {
      vid.webkitRequestFullScreen();
    } else if(vid.mozRequestFullScreen) {
      vid.mozRequestFullScreen();
    }
}

// function toggleCaption() {
//     if(vid.requestCaption) {
//       vid.requestCaption();
//     } else if(vid.webkitRequestCaption) {
//       vid.webkitRequestCaption();
//     } else if(vid.mozRequestCaption) {
//       vid.mozRequestCaption();
//     }
// }

$vidContainer.mouseenter(function () {
      $video_controls.fadeIn(500);
    }),
$vidContainer.mouseleave(function () {
      $video_controls.fadeOut(500);
    });











