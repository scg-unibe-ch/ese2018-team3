export class UserNotLoggedInError extends Error {
    name: string = this.constructor.name;
}