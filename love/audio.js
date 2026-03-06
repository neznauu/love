/* Persistent background music across pages.
   Keeps a start timestamp in localStorage so the track appears to continue
   when navigating between separate HTML pages (not perfectly gapless, but
   resumes at the correct position). Uses music/love.mp3 from the music folder.
*/
(function(){
  const AUDIO_SRC = 'music/love.mp3';
  const STORAGE_KEY = 'bgMusicStartTimestamp';
  const AUDIO_ID = 'bg-music-persistent';

  let audio = document.getElementById(AUDIO_ID);
  if(!audio){
    audio = document.createElement('audio');
    audio.id = AUDIO_ID;
    audio.src = AUDIO_SRC;
    audio.loop = true;
    audio.preload = 'auto';
    audio.style.display = 'none';
    document.body.appendChild(audio);
  }

  function ensureStartTimestamp(){
    if(!localStorage.getItem(STORAGE_KEY)){
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    }
  }

  function resumePlayback(){
    const start = parseInt(localStorage.getItem(STORAGE_KEY), 10);
    if(!start || !audio) return;

    function setTimeAndPlay(){
      const duration = audio.duration || 0;
      const elapsed = (Date.now() - start) / 1000; // seconds
      if(duration && !isNaN(duration) && duration > 0){
        audio.currentTime = elapsed % duration;
      }
      audio.play().catch(()=>{});
    }

    if(audio.readyState >= 1){
      setTimeAndPlay();
    } else {
      audio.addEventListener('loadedmetadata', setTimeAndPlay, {once:true});
    }
  }

  // Initialize
  ensureStartTimestamp();
  // Try to resume immediately; will wait for metadata if needed
  resumePlayback();

  // If user explicitly wants to restart music, they can clear the key:
  // localStorage.removeItem('bgMusicStartTimestamp')
})();
