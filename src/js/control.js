// 1. Initialize the player
const player = videojs('my-video');

// --- CONTROLS LOGIC ---
document.getElementById('btn-play').addEventListener('click', function() {
    player.play();
});

document.getElementById('btn-pause').addEventListener('click', function() {
    player.pause();
});

document.getElementById('btn-stop').addEventListener('click', function() {
    player.pause();
    player.currentTime(0); 
});

document.getElementById('btn-forward').addEventListener('click', function() {
    player.currentTime(player.currentTime() + 5);
});

document.getElementById('btn-backward').addEventListener('click', function() {
    player.currentTime(player.currentTime() - 5);
});


// --- PLAYLIST LOGIC ---
const tracks = document.querySelectorAll('.track');

tracks.forEach(track => {
    track.addEventListener('click', function() {
        
        // 1. Reset all tracks to default
        tracks.forEach(t => {
            t.classList.remove('active');
            t.querySelector('.status').innerText = '';
        });

        // 2. Highlight the clicked track
        this.classList.add('active');
        this.querySelector('.status').innerText = 'Playing';

        // 3. Switch the video stream
        const newUrl = this.getAttribute('data-url');
        
        player.src({
            src: newUrl,
            type: 'application/x-mpegURL'
        });
        
        player.load(); // <-- This forces the player to grab the new stream
        player.play();
    });
});


// --- SHUFFLE BUTTON LOGIC ---
document.getElementById('btn-shuffle').addEventListener('click', function() {
    // Pick a random number between 0 and the number of tracks we have (5)
    const randomIndex = Math.floor(Math.random() * tracks.length);
    
    // Find that random track in our list
    const randomTrack = tracks[randomIndex];
    
    // Programmatically "click" that track
    randomTrack.click();
});