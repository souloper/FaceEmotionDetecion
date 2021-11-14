var myVideo = document.getElementById("cam_op");

function playPause() { 
    if (myVideo.paused) 
      myVideo.play(); 
    else 
      myVideo.pause(); 
  } 