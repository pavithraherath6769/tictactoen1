import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerBoardComponent } from './player-board/player-board.component';
import { PlayerLobbyComponent } from './player-lobby/player-lobby.component';
import { PlayerLoginComponent } from './player-login/player-login.component';

const routes: Routes = [
  { path: '', component: PlayerLoginComponent },
  {path: 'lobby', component: PlayerLobbyComponent },
  { path: 'board', component: PlayerBoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
