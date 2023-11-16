export class Artist{
   constructor(_id, _name, _nbFan, _picture_xl, _tracklist){
      this.id=_id;
      this.name=_name;
      this.nbFan=_nbFan;
      this.picture_xl=_picture_xl;
      this.tracklist=_tracklist;
      
      console.log(this);
   }
}