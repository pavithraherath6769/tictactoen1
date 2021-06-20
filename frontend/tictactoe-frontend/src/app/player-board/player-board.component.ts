import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameServiceService } from '../game-service.service';

@Component({
  selector: 'app-player-board',
  templateUrl: './player-board.component.html',
  styleUrls: ['./player-board.component.scss']
})
export class PlayerBoardComponent implements OnInit {

  constructor(public gameservice:GameServiceService,  private router: Router) { }

  ngOnInit(): void {
  }
  leaveGame(){
    this.gameservice.leaveGame();
    this.router.navigateByUrl('/lobby')
  }
}
