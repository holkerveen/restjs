import {createServer, IncomingMessage, Server, ServerResponse} from "http";

export default class AsyncServer {
    private server: Server;

    constructor(port: number, hostname: string) {
        this.server = createServer();

        this.server.listen(port, hostname, () => console.log('Server listening'));
    }

    request(): Promise<[IncomingMessage, ServerResponse]> {
        return new Promise((resolve, reject) => {
            this.server.on('request',
                (request: IncomingMessage, response: ServerResponse) => resolve([request, response])
            );
            this.server.on('error',(e:Error)=>reject(e));
        });
    }
}