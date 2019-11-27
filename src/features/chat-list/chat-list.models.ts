import { UserModel } from '../user/user.models';

export interface ChatModel {
    id: string;
    name: string;
    members: UserModel[]
}