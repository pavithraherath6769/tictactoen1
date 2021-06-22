import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GameServiceService } from '../game-service.service';

@Component({
  selector: 'app-player-board',
  templateUrl: './player-board.component.html',
  styleUrls: ['./player-board.component.scss']
})
export class PlayerBoardComponent implements OnInit {

  constructor(public gameservice:GameServiceService,  private router: Router, private toastrservice: ToastrService) { }

  ngOnInit(): void {
  }
  leaveGame(){
    this.gameservice.leaveGame();
    this.toastrservice.success('Game Leave Success', 'success');
    this.router.navigateByUrl('/lobby')
  }
}
