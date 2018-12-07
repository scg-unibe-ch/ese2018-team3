export class UsernameAlreadyTakenError extends Error {
    name: string = this.constructor.name;
}