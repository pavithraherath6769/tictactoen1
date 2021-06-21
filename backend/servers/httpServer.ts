import * as http from 'http'

//class of the http server
export default class HttpServer {
  public server: http.Server

  constructor(requestHandler: http.RequestListener) {
    this.server = http.createServer(requestHandler)
  }

  //starting the http server
  public listen(port: number, callback: Function): void {
    this.server.listen(port, callback(port))
  }

  
  // paeses body of request
  public collectRequestData(
    request: http.IncomingMessage,
    callback: Function
  ): void {
    let body: string = ''
    request.on('data', chunk => {
      body += chunk.toString()
    })
    request.on('end', () => {
      callback(JSON.parse(body))
    })
  }
}
