import {createServer, IncomingMessage, ServerResponse} from "http";
import AsyncServer from "./AsyncServer";

(async function run(){
    const server = new AsyncServer(2000, 'localhost');
    let req:IncomingMessage; let serverResponse:ServerResponse;
    [req, serverResponse] = await server.request();
    console.log(`${new Date().toISOString()} ${req.headers.authorization}@${req.connection.remoteAddress} ${req.method} ${req.url}`);

    let url = new URL(req.url, `http://${req.headers.host}`);
    console.log('url:'+url);
    // response.end(JSON.stringify({url:url,rurl:request.url}));
})().then(_=>console.log('finished')).catch(e=>console.log('error',e));
