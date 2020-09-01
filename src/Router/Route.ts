import {RouteCriteria, RouteParameters} from "./RouteMatcher";
import {IncomingMessage, ServerResponse} from "http";

export type Route = {
    criteria: RouteCriteria;
    action: (request: IncomingMessage, response: ServerResponse, parameters ?: RouteParameters) => ServerResponse;
}
