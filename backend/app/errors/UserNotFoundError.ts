export class UserNotFoundError extends Error {
    name: string = this.constructor.name;
}