export class Track{
   constructor(_index, _title, _artistName, _rank, _duration, _preview, _container,_cover,_songID,_audioPlayer){
      this.index = _index;
      this.title= _title;
      this.artistName= _artistName;
      this.rank=_rank;
      this.duration=_duration;
      this.preview= _preview;
      this.container= _container;
      this.cover= _cover;
      this.songID=_songID;
      this.audioPlayer=_audioPlayer;
      this.HTMLinit();
   }

   HTMLinit(){
      let temp= document.querySelector(`#areatrack-template`);
      let clone= temp.content.cloneNode(true);

      this.setVariables(clone);
      this.container.append(clone);
   }

   setVariables(clone){
      clone.querySelector(`.track-tracklist-title`).innerText=this.title;
      clone.querySelector(`.track-tracklist-artist`).innerText=this.artistName;
      clone.querySelector(`.track-tracklist-index`).innerText=this.index;
      clone.querySelector(`.track-tracklist-rank`).innerText=this.rank;
      clone.querySelector(`.track-tracklist-time`).innerText=this.duration; 
      let tracklist = clone.querySelector(`.areatrack`);
      let minuteConvertedDuration=Math.floor(this.duration/60);
      let secondConvertedDuration=this.duration%60;
      secondConvertedDuration=String(secondConvertedDuration).padStart(2,`0`);
      this.duration=`${minuteConvertedDuration}:${secondConvertedDuration}`;
      tracklist.addEventListener(`click`,()=>{
         this.setSong(this.title, this.artistName, this.cover, this.preview, this.songID)
      })
   }

   setSong(title, artist, cover, preview,songID){
      let previousButton = document.querySelector('.bi-skip-start-fill');
      let playPauseButton = document.getElementById('play');
      let nextButton = document.querySelector('.bi-skip-end-fill');

      document.querySelector('.musicPlayerTitle ').innerHTML = title;
      document.querySelector('.musicPlayerArtist').innerHTML = artist;
      document.querySelector('.imgMusicPlayer').src = cover;
      this.audioPlayer.src = preview;
      this.audioPlayer.play();
      playPauseButton.classList.remove('bi-play-fill');
      playPauseButton.classList.remove('ms-1');
      playPauseButton.classList.add('bi-pause-fill');
      previousButton.addEventListener('click', () => {
         this.changeSong(songID,`minus`);
      })
      nextButton.addEventListener('click', () => {
         this.changeSong(songID,`plus`);
      })
   }

   changeSong(songID,operator) {
      fetch(`https://striveschool-api.herokuapp.com/api/deezer/track/${songID}`, {
         method: 'GET',
         headers: {
            "Content-Type": "application/json",
         }
      }).then(res => res.json())
      .then(track => {
            
         let albumID = track.album.id;

         fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumID}`, {
            method: 'GET',
            headers: {
               "Content-Type": "application/json",
            }
         }).then(res => res.json())
         .then(album => {
            console.log(album);
            let currentIndex = album.tracks.data.findIndex(t => t.id == songID);
            let previousIndex= operator==`minus`?  currentIndex-1 : currentIndex+1;
            let previousTrack = album.tracks.data[previousIndex];

            this.setSong(previousTrack.title, previousTrack.artist.name, album.cover_small, previousTrack.preview, previousTrack.id);
         });
      });
   }
}