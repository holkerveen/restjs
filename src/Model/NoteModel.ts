import ModelInterface from "./ModelInterface";
import {model} from "./ModelManager";
import NoteRepository from "../Repository/NoteRepository"
import UserModel from "./UserModel";

@model({
    name: 'note',
    repository: NoteRepository,
})
export default class NoteModel implements ModelInterface {
    id: number;
    owner: UserModel | number;
    text: string;
}
