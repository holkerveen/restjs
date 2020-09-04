import RepositoryInterface from "../Repository/RepositoryInterface";
import {ModelDefinition} from "../Model/ModelManager";
import {IncomingMessage, ServerResponse} from "http";
import {RouteParameters} from "../Router/RouteMatcher";
import {badRequest, fileNotFound} from "../ResponseHelpers";
import ModelInterface from "../Model/ModelInterface";
import {readIncomingMessageDataJson} from "../HttpHelpers";

export default class RestController {
    private repository: RepositoryInterface;
    private modelClass: { new(): ModelInterface };

    async list(request: IncomingMessage, response: ServerResponse) {
        response.writeHead(200, {'Content-Type': 'application/json'});
        const result = await this.repository.find();
        response.write(JSON.stringify(result), 'utf-8');
        response.end();
        return response;
    }

    async get(request: IncomingMessage, response: ServerResponse, parameters ?: RouteParameters) {
        response.writeHead(200, {'Content-Type': 'application/json'});
        const result = await this.repository.load(parseInt(parameters.id));
        if(!result) return fileNotFound(response);
        response.write(JSON.stringify(await this.repository.load(parseInt(parameters.id))), 'utf-8');
        response.end();
        return response;
    }

    async create(request: IncomingMessage, response: ServerResponse) {
        let model: ModelInterface = new this.modelClass();
        const data = await readIncomingMessageDataJson(request);
        if(data === false) return badRequest(response);
        if(data.hasOwnProperty('id')) return badRequest(response);
        model = {...model, ...data};
        await this.repository.save(model);
        response.end(JSON.stringify(model), 'utf-8');
        return response;
    }

    async update(request: IncomingMessage, response: ServerResponse) {
        const data = <ModelInterface | false>await readIncomingMessageDataJson(request);
        if (data === false) return badRequest(response);
        if (!data.hasOwnProperty('id')) return badRequest(response);

        let model: ModelInterface = await this.repository.load(data.id);
        model = {...model, ...data};
        await this.repository.save(model);
        response.end(JSON.stringify(model), 'utf-8');
        return response;
    }

    async delete(request: IncomingMessage, response: ServerResponse, parameters ?: RouteParameters) {
        await this.repository.delete(parseInt(parameters.id));
        response.end();
    }

    setModelDefinition(modelDefinition: ModelDefinition) {
        if (!modelDefinition.repository) {
            throw Error(`Model '${modelDefinition.name}' does not have an associated repository`);
        }
        this.repository = new modelDefinition.repository();
        this.modelClass = modelDefinition.type;
    }
}