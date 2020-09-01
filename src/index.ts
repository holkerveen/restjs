import {createServer, IncomingMessage, ServerResponse} from "http";
import NoteModel from "./Model/NoteModel";
import UserModel from "./Model/UserModel";
import {resolve} from "./Router/RouteMatcher";
import {Route} from "./Router/Route";
import ConfigProvider from "./Config/ConfigProvider";
import {createRestRoutes} from "./RestHelpers";
import {fileNotFound, serverError} from "./ResponseHelpers";

const routes: Route[] = createRestRoutes(
    NoteModel,
    UserModel
);

const config = ConfigProvider.getConfig();

const server = createServer();
server.listen(config.listen.port, config.listen.host, () => console.log('Server listening'));
server.on('request', async (request: IncomingMessage, response: ServerResponse) => {

    try {

        const route: Route = resolve(request, routes);
        route
            ? await route.action(request, response, route.resolvedParameters)
            : fileNotFound(response);

    } catch (e) {
        console.error(e);
        serverError(response);
    } finally {
        console.log(`${new Date().toISOString()} ${response.statusCode} ${request.headers.authorization}@${request.connection.remoteAddress} ${request.method} ${request.url}`);
    }

});

