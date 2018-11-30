export class UserUnauthorizedError extends Error {
    name: string = this.constructor.name;
}