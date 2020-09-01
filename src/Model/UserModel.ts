import ModelInterface from "./ModelInterface";
import {model} from "./ModelManager";
import UserRepository from "../Repository/UserRepository";

@model({
    name: 'user',
    repository: UserRepository
})
export default class UserModel implements ModelInterface{
    id: number;
    email: string;
    password: string;
}