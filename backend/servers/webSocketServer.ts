import * as http from 'http'
import * as websocket from 'websocket'
import Game from '../game'

interface User {
  name: string
  connection?: websocket.connection
}

interface Game {
  board: Array<string | number>
  X: User
  O: User

}

// class of the websocket server
export default class WebSocketServer {
  // Connected user.
  public users: User[] = []

 
  // Running game.
  public games: Game[] = []

  constructor(httpServer: http.Server) {
    let ws = new websocket.server({ httpServer })

    // Handle requests.
    ws.on('request', request => {
      try {
        let connection = request.accept('tictactoe', request.origin)
        console.log(new Date() + ' Connection accepted.')

        connection.on('message', message => {
          if (message.type !== 'utf8') return
          let { utf8Data } = message
          console.log('Received Message: ' + utf8Data)

          this.handleMessage(connection, JSON.parse(utf8Data))
        })

        connection.on('close', () => {
          this.leaveGame(connection)
          this.removeUser(connection)
        })
      } catch (e) {
        console.log(e)
      }
    })
  }

  //handels the message
  private handleMessage(connection: websocket.connection, msg: any): void {
    let from = msg.from ? this.users.find(user => user.name === msg.from) : null
    // let to = msg.to ? this.users.find(user => user.name === msg.to) : null
    switch (msg.type) {
      case 'enterLobby':
        this.addUser(connection, msg.name)
        break
      case 'leaveLobby':
        this.removeUser(connection)
        break
    
      case 'leaveGame':
        this.addUser(connection, msg.name)
        this.leaveGame(connection)
        break
      
      case 'startAI':
        this.startAI(connection)
        break
     
      case 'AITurn':
        this.makeAITurn(connection, msg.board)
        break
      default:
        break
    }
    
  }


  // make a move against the AI. emits the new board to the opponent.
  private makeAITurn(
    connection: websocket.connection,
    board: Array<string | number>
  ) {
    let { game } = this.getGame(connection)
    if (!game) return
    game.board = Game.makeAiTurn(board)
    let winner = Game.checkWinner(board)
    let msg = JSON.stringify({
      type: 'turn',
      message: { board, next: 'O', winner }
    })
    game.O.connection.sendUTF(msg)
 
  }

  
  // Add user to the user list
  private addUser(connection: websocket.connection, name: string): void {
    if (this.users.find(user => user.connection === connection)) return
    this.users.push({ name, connection })
  }

 
  //remove user 
  private removeUser(connection: websocket.connection): void {
    this.users = this.users.filter(user => user.connection !== connection)
  }

  /**
   * Get running game of a user.
   */
  public getGame(
    connection: websocket.connection
  ): { game: Game | null; opponent: User | null } {
    let opponent: User = null
    let game: Game = null
    for (let item of this.games) {
      if (item.O.connection === connection) {
        opponent = item.X
        game = item
        break
      }
      if (item.X.connection === connection) {
        opponent = item.O
        game = item
        break
      }
    }
    return { game, opponent }
  }


  // User leves game
  public leaveGame(connection: websocket.connection): void {
    
    let { game, opponent } = this.getGame(connection)
    if (opponent && opponent.connection)
      this.send(opponent.connection, 'leaveGame')
    this.games = this.games.filter(item => item !== game)
  }


  // Start the game with AI
  private startAI(connection: websocket.connection): void {
    this.games.push({
      X: { name: 'AI' },
      O: this.users.find(user => user.connection === connection),
      board: Array.from(Array(9).keys()),

    })
    this.removeUser(connection)
  }


  // emit message to the client
  private send(
    connection: websocket.connection,
    type: string,
    message?: any
  ): void {
    connection.sendUTF(JSON.stringify({ type, message }))
  }
}
