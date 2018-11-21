export class UserNotAdminError extends Error {
    name: string = this.constructor.name;
}