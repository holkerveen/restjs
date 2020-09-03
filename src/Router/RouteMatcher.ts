import {IncomingMessage} from "http";
import {Route} from "./Route";

export interface RouteCriteria {
    method?: 'GET' | 'POST' | 'PUT';
    path?: RegExp;
}

export type RouteParameters = { [k: string]: string };

export function match(criteria: RouteCriteria, request: IncomingMessage): { [name: string]: string } | false {
    let url = new URL(request.url, `http://${request.headers.host}`);
    let parameters: { [k: string]: string } = {};

    if (criteria.method && criteria.method !== request.method.toUpperCase()) return false;
    if (criteria.path) {
        const matches = url.pathname.match(criteria.path);
        if (matches === null) return false;
        parameters = {...parameters, ...matches.groups};
    }
    // @todo implement more tests
    return parameters;
}

export function resolve(request: IncomingMessage, routes: Route[]): Route | null {
    for (let i = 0; i < routes.length; i++) {
        const m = match(routes[i].criteria, request);
        if (m === false) continue;
        return {...routes[i], ...{resolvedParameters: m}};
    }
}