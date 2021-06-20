import { Component, OnInit } from '@angular/core';
import { GameServiceService } from '../game-service.service';

@Component({
  selector: 'app-player-lobby',
  templateUrl: './player-lobby.component.html',
  styleUrls: ['./player-lobby.component.scss']
})
export class PlayerLobbyComponent implements OnInit {

  constructor(public gameservice:GameServiceService) { }

  ngOnInit(): void {
  }

}
