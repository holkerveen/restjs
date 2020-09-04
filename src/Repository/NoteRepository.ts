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

    async load(id: number): Promise<NoteModel> {
        return <NoteModel>await this.data.find('note',id);
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