import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GameServiceService } from '../game-service.service';

@Component({
  selector: 'app-player-login',
  templateUrl: './player-login.component.html',
  styleUrls: ['./player-login.component.scss']
})
export class PlayerLoginComponent implements OnInit {
  public name: string = '';
  public error: string = '';

  constructor(private router:Router, public gameservice:GameServiceService, private toastrservice: ToastrService) { }

  ngOnInit(): void {
    this.toastrservice.success('Hi welcome to TIC TAC TOE!', 'success');
  }
  


 public async login() {
  if (!this.name) return
  let  {success}  = await this.gameservice.login(this.name)

  if (success) {
    this.toastrservice.success('Login Success', 'success');
    this.gameservice.enterLobby(this.name)
    this.router.navigateByUrl('/lobby')
  } else {
    console.log('Cant login');
  }
}

}
