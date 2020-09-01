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

    save(id: number, model: ModelInterface): void {
    }

}