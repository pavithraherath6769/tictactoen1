import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerLoginComponent } from './player-login/player-login.component';
import { PlayerLobbyComponent } from './player-lobby/player-lobby.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlayerBoardComponent } from './player-board/player-board.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PlayerLoginComponent,
    PlayerLobbyComponent,
    PlayerBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
