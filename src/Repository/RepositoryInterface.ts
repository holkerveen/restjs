import ModelInterface from "../Model/ModelInterface";

export default interface RepositoryInterface {
    load(id: number): ModelInterface;

    find(param?: { [k: string]: any }): Promise<ModelInterface[]>;

    save(id: number, model: ModelInterface): void;
}

