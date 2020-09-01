import {IncomingMessage} from "http";

export interface RouteCriteria {
    method?: 'GET' | 'POST';
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