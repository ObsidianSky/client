import {Identifiable} from "../../shared/models";

export interface UserModel {
    name: string;
    email: string;
}

export type IdentifiableUser = UserModel & Identifiable;