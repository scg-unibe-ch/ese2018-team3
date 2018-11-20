import {Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {UserModel} from './';

@Table
export class AdminModel extends Model<AdminModel> {

    @ForeignKey(() => UserModel)
    @Column
    userId!: number;

    toSimplification(): any {
        return {
            'id': this.id,
            'userId': this.userId,
        };
    }

    fromSimplification(simplification: any): void {
        this.userId = simplification['userId'];
    }
}
