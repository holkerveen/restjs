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

    load(id: number): UserModel {
        return {id: 2, email: 'piet', password: ''};
    }

    save(id: number, model: ModelInterface): void {
    }

}