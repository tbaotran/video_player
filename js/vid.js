var vid, playbtn, seekslider;

function initializePlayer() {
  // Set object references
  vid = document.getElementById("my_video");
  playbtn = document.getElementById("playpausebtn");
  seekslider = document.getElementById("seekslider");
  // Add event listeners
  playbtn.addEventListener("click",playPause,false);
  seekslider.addEventListener("change",vidSeek,false);
  vid.addEventListener("timeupdate",seekTimeupdate,false);
}
window.onload = initializePlayer;

function playPause() {
    if(vid.paused) {
      vid.play();
      playbtn.innerHTML = "Pause";
    } else {
      vid.pause();
      playbtn.innerHTML = "Play";
    }
} 

function vidSeek() {
    var seekto = vid.duration * (seekslider.value / 100);
    vid.currentTime = seekto;
}

function seekTimeupdate() {
    var newtime = vid.currentTime * (100 / vid.duration);
    seekslider.value = newtime;
}