export class User {
    id: number;
    company: string;
    username: string;
    email: string;
    token: string;
    isApproved: boolean;

    getProperties(): any {
        return {
            'id': this.id,
            'company': this.company,
            'username': this.username,
            'email': this.email,
            'token': this.token,
            'isApproved': this.isApproved
        }
    }
}