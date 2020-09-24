export interface ResponseModel {
    type: MessageType,
    message: string
}
export class MessageType {
   static   get info() { return "info" }
   static   get warning() { return "warning" }
   static   get success() { return "success" }
   static   get error() { return "error" }
}