import RepositoryInterface from "./RepositoryInterface";
import ModelInterface from "../Model/ModelInterface";
import NoteModel from "../Model/NoteModel";
import DataStoreProvider from "../DataStore/DataStoreProvider";

export default class NoteRepository implements RepositoryInterface {
    private data: DataStoreInterface = DataStoreProvider.getDataStore();

    async find(param?: { [p: string]: any }): Promise<NoteModel[]> {
        const result = await this.data.query('note');
        return <NoteModel[]>result;
    }

    load(id: number): NoteModel {
        return {id: 1, text: 'henk', owner: 1};
    }

    save(id: number, model: ModelInterface): void {
    }

}