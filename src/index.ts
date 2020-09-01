import {createServer, IncomingMessage, ServerResponse} from "http";
import NoteModel from "./Model/NoteModel";
import UserModel from "./Model/UserModel";
import {match} from "./Router/RouteMatcher";
import RestController from "./Controller/RestController";
import {Route} from "./Router/Route";
import manager, {ModelType} from "./Model/ModelManager";
import ConfigProvider from "./Config/ConfigProvider";

const routes: Route[] = [
    // {
    //     criteria: {method: 'GET', path: /^\/note$/},
    //     action: RestController.list
    // },
    // {
    //     criteria: {method: 'GET', path: /^\/note\/(?<id>[0-9]+)$/},
    //     action: RestController.get,
    // }
];

[NoteModel, UserModel].forEach((type: ModelType) => {
    const definition = manager.getByType(type);
    const restController = new RestController();
    restController.setModelDefinition(definition);
    routes.push({
        criteria: {method: 'GET', path: new RegExp(`^/${definition.name}$`)},
        action: restController.list.bind(restController),
    });
    routes.push({
        criteria: {method: 'GET', path: new RegExp(`^/${definition.name}/(?<id>[0-9]+)$`)},
        action: restController.get.bind(restController),
    });
});

// noinspection TypeScriptUnresolvedVariable
const server = createServer();

const config = ConfigProvider.getConfig();
server.listen(config.listen.port, config.listen.host, () => console.log('Server listening'));

server.on('request', async (request: IncomingMessage, response: ServerResponse) => {

    try {
        for (let i = 0; i < routes.length; i++) {
            const m = match(routes[i].criteria, request);
            if (m === false) continue;
            await routes[i].action(request, response, m);
            if (!response.writableEnded) response.end();
        }

        if (!response.writableEnded) {
            response.writeHead(404, "FileNotFound", {"Content-Type": "text/plain; charset=utf-8"}).end("File Not Found", "utf-8");
        }
    } catch (e) {
        console.error(e);
        response.writeHead(500, "Server Error", {"Content-Type": "text/plain; charset=utf-8"}).end("Server Error", "utf-8");
    } finally {
        console.log(`${new Date().toISOString()} ${response.statusCode} ${request.headers.authorization}@${request.connection.remoteAddress} ${request.method} ${request.url}`);
    }

});

// (async function run() {
//
//     const server = new AsyncServer(config.listen.port, config.listen.host);
//
//     let request: IncomingMessage;
//     let response: ServerResponse;
//
//     while (1) {
//         [request, response] = await server.request();
//
//         let url = new URL(request.url, `http://${request.headers.host}`);
//         let method = request.method;
//
//         console.log('url:' + url);
//
//         const routers: RouterInterface[] = [restRouter];
//
//         let action: (request: IncomingMessage, response: ServerResponse) => Promise<ServerResponse>;
//         for (let i in routers) {
//             action = routers[i].match({url: url, method: method});
//             if (action) break;
//         }
//
//         if (!action) {
//             response.writeHead(404, "File Not Found").end();
//             console.error(`${new Date().toISOString()} 404 ${request.headers.authorization}@${request.connection.remoteAddress} ${request.method} ${request.url}`);
//             continue;
//         }
//
//         action(request, response).then(response => {
//             response.end();
//             console.log(`${new Date().toISOString()} ${response.statusCode} ${request.headers.authorization}@${request.connection.remoteAddress} ${request.method} ${request.url}`);
//         });
//
//     }
// })().then(_ => console.log('finished')).catch(e => console.log('error', e));
