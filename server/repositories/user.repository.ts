import { Observable, from } from 'rxjs';
import "reflect-metadata";
import User, { UserModel } from '../models/user.model';
import LOGGER from '../configuration/winston';
import { injectable } from 'inversify';

export interface UserRepository {
    getUserDataForEmailAndSms(userId: string): Observable<UserModel>;
    getUserById(userId: string): Observable<UserModel>;
}

@injectable()
export class UserRepositoryImpl implements UserRepository {

    constructor() {
        LOGGER.info('User Repository');
    }

    getUserDataForEmailAndSms(userId: string): Observable<UserModel> {
        LOGGER.debug('user id is: ' + userId);
        return this.getUserById(userId);
    }

    getUserById(userId: string): Observable<UserModel> {
        return from(User.findById(userId).exec());
    }

}