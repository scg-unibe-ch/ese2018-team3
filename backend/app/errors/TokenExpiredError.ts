export class TokenExpiredError extends Error {
    name: string = this.constructor.name;
}