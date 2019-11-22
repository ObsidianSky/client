export interface MessageModel {
    "_id": string,
    "id": string,
    "type": string,
    "content": string,
    "createdOn": number,
    "modifiedOn": number,
    "authorId": string,
    "chatId": string,
    "deleted": boolean,
    "edited": boolean,
    "author":
        {
            "_id": string,
            "name": string,
            "email": string
        }

}
