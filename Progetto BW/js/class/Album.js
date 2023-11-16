export class Album{
   constructor(_cover, _title, _tracks, _release_date, _artistID, _artistName){
      this.cover_big=_cover;
      this.title=_title;
      this.tracks=_tracks;
      this.release_date=_release_date;
      this.artistID=_artistID;
      this.artistName=_artistName;
      console.log(this);
   }
}