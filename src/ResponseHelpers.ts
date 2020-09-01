import {ServerResponse} from "http";

export function fileNotFound(response: ServerResponse): ServerResponse {
    response.writeHead(404, "File not found", {"Content-Type": "application/json"});
    response.end(JSON.stringify({
        error: {
            code: 404,
            message: "File not found",
        }
    }), "utf-8");
    return response;
}

export function serverError(response: ServerResponse): ServerResponse {
    response.writeHead(500, "Internal server error", {"Content-Type": "application/json"});
    response.end(JSON.stringify({
        error: {
            code: 500,
            message: "Internal server error",
        }
    }), "utf-8");
    return response;
}
