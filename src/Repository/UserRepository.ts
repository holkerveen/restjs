import RepositoryInterface from "./RepositoryInterface";
import ModelInterface from "../Model/ModelInterface";
import UserModel from "../Model/UserModel";
import DataStoreProvider from "../DataStore/DataStoreProvider";

export default class UserRepository implements RepositoryInterface {
    private data: DataStoreInterface = DataStoreProvider.getDataStore();

    async find(param?: { [p: string]: any }): Promise<UserModel[]> {
        const result = await this.data.query('user');
        return <UserModel[]>result;
    }

    async load(id: number): Promise<UserModel> {
        return <UserModel> await this.data.find('user',id);
    }

    async save(model: ModelInterface): Promise<void> {
        return model.id
            ? await this.data.update('note', model)
            : await this.data.insert('note', model);
    }

    async delete(id: number): Promise<void> {
        return await this.data.delete('note', id);
    }

}