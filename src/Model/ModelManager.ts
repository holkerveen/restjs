import ModelInterface from "./ModelInterface";
import RepositoryInterface from "../Repository/RepositoryInterface";


export type ModelType = new() => ModelInterface;

export type ModelDefinition = {
    type?: new() => ModelInterface,
    repository?: new() => RepositoryInterface,
    name: string;
}

class ModelManager {
    constructor(private definitions: ModelDefinition[] = []) {
    }

    addDefinition(definition: ModelDefinition) {
        this.definitions.push(definition);
    }

    getByName(name: string): ModelDefinition {
        return this.definitions.filter((definition: ModelDefinition) => definition.name === name)[0];
    }

    getByType(type: Function):ModelDefinition {
        return this.definitions.filter((definition: ModelDefinition) => definition.type === type)[0];
    }
}

const manager = new ModelManager();

export function model(definition: ModelDefinition) {
    return (type: new() => ModelInterface) => {
        definition.type = type;
        manager.addDefinition(definition);
    }
}

export default manager;
