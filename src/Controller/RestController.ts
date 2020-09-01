import RepositoryInterface from "../Repository/RepositoryInterface";
import {ModelDefinition} from "../Model/ModelManager";
import {IncomingMessage, ServerResponse} from "http";
import {RouteParameters} from "../Router/RouteMatcher";

export default class RestController {
    private repository: RepositoryInterface;

    async list(request: IncomingMessage, response: ServerResponse) {
        response.writeHead(200, {'Content-Type': 'application/json'});
        const result = await this.repository.find();
        response.write(JSON.stringify(result), 'utf-8');
        return response;
    }

    get(request: IncomingMessage, response: ServerResponse, parameters ?: RouteParameters) {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write(JSON.stringify(this.repository.load(parseInt(parameters.id))), 'utf-8');
        return response;
    }

    setModelDefinition(modelDefinition: ModelDefinition) {
        if (!modelDefinition.repository) {
            throw Error(`Model '${modelDefinition.name}' does not have an associated repository`);
        }
        this.repository = new modelDefinition.repository();
    }
}