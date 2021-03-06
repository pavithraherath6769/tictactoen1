import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { webSocket } from 'rxjs/webSocket'
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr';


interface Message {
  type: string
  message: any
}

@Injectable({
  providedIn: 'root'
})

export class GameServiceService {
  public websocket = webSocket({
    url: environment.wsUrl,
    protocol: environment.wsProtocol
  })
  public userName: string = '';
  public board: Array<string | number> = [];
  public locked: boolean = false;
  public ai: boolean = false;
  public status: string = '';
  public player: string = ''; //board
  public spectator: boolean = false;
  public computerScore: number = 0;
  public humanScore: number = 0;
  public turn = '';

  constructor(private router: Router , private http: HttpClient,private toastrservice: ToastrService) { 
    this.websocket.subscribe(

      (message:any) =>this.handleMessage(message),
      err => console.log(err),
      () => console.log('complete')
      )
    
  }

  private handleMessage(message: Message): void {
    let { message: msg } = message
    switch (message.type) {
      case 'turn':
        this.board = msg.board
        if (msg.winner) {
          if (msg.winner == this.player) {
            this.status = 'You won!'
            this.toastrservice.success('You WON!', 'Game Status');
          } else if (msg.winner == 'Tie') {
            this.status = 'Tie!'
            this.toastrservice.success('TIE!', 'Game Status');
          } else {
            this.status = 'You lost!'
            this.toastrservice.success('You lost!', 'Game Status');
          }
        } else {
          this.locked = msg.next !== this.player
        }
        break
      default:
        break
    }
  }
  public login(name: string): Promise<{ success: boolean }> {
    return this.http
      .post<{ success: boolean }>(environment.apiUrl + '/login', { name })
      .toPromise()
  }
 
  startAIGame(){
    this.router.navigateByUrl('/board')
    this.player = 'O'
    this.board = Array.from(Array(9).keys())
    this.status = ''
    this.locked = false;
    this.ai = true
    this.router.navigateByUrl('/board')
    this.websocket.next({ type: 'startAI' });
    this.randomNumber(1); // start the game at random
  }

  getCell(index: number): string | number {
    return typeof this.board[index] === 'number' ? '' : this.board[index]
  }

  enterLobby(name: string): void {
    this.userName = name
    this.websocket.next({ type: 'enterLobby', name })
  }

  leaveGame(): void {
    this.websocket.next({ type: 'leaveGame', name: this.userName })
  }

  
  humanClick(e:any): void {
    if (this.locked) return
    let { id } = e.target
    if (typeof this.board[id] == 'number') {
      this.board[id] = this.player
      this.locked = true
      if (this.ai) {
        this.websocket.next({ type: 'AITurn', board: this.board })
      } 
      
    }
  }
  randomNumber(n:any) { 
    let cfd =  Math.floor(Math.random() * (n + 1));
    console.log('number',cfd ); 
    if(cfd == 1 ){
      this.humanfn1();
    }else{
      this.aifn2();
    }
  } 
    //play aifirst
    aifn2() { 
      this.locked = true;
      this.turn ='AI first Move'
      this.websocket.next({ type: 'AITurn', board: this.board });
      this.toastrservice.success('AI will move first', 'Game Status'); 
      console.log('AI first');
    } 
  
     //play humanfirst
     humanfn1() { 
      this.locked = false
      this.turn ='Player first Move'
      console.log('Player first');
      this.toastrservice.success('Please make your move', 'Game Status'); 
    }
}
