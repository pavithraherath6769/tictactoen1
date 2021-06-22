import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GameServiceService } from '../game-service.service';
import { Howl, Howler } from 'howler';

@Component({
  selector: 'app-player-lobby',
  templateUrl: './player-lobby.component.html',
  styleUrls: ['./player-lobby.component.scss']
})
export class PlayerLobbyComponent implements OnInit , OnDestroy  {
  soundicon:boolean = true;
  music = new Howl({ src: ['assets/brave.mp3'], html5: true, loop:true });

  constructor(public gameservice:GameServiceService, private toastrservice: ToastrService) { }

  ngOnInit(): void {
    this.toastrservice.success('Welcome to the Game Lobby', 'success');
    this.music.play();
  }
  ngOnDestroy(): void {
    this.music.stop();
  }
  musicSound(){
    this.soundicon= !this.soundicon;
    if(this.soundicon == true){
      this.music.play();
      this.toastrservice.info('music is started ;-)', 'info');
    } else{
      this.music.stop();
      this.toastrservice.info('music is stopped', 'info');
    }
    
  }
}
