import ModelInterface from "../Model/ModelInterface";

export default interface RepositoryInterface {
    load(id: number): Promise<ModelInterface>;

    find(param?: { [k: string]: any }): Promise<ModelInterface[]>;

    save(model: ModelInterface, id?: number): Promise<void>;

    delete(id: number): Promise<void>;
}

