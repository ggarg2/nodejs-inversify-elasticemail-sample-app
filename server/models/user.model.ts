import * as mongoose from 'mongoose';

/* usermodel for intreation the database */

export interface UserModel extends mongoose.Document {
    _id: string,
    uid: string,
    firstName: string,
    lastName: string,
    emailId: string,
    address: string,
    gender: string,
    type: string,
    photoUrl: string,
    roles: string[],
    mobileNo: number,
    age: number,
    emailVerified: boolean,
}

export const UserSchema = new mongoose.Schema({
    // _id: string;
    uid: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    emailId: { type: String },
    address: { type: String },
    gender: { type: String },
    type: { type: String },
    photoUrl: { type: String },
    roles: { type: [String] },
    mobileNo: { type: Number },
    age: { type: Number },
    emailVerified: { type: Boolean }
})

const User = mongoose.model<UserModel>('User', UserSchema, 'User');
export default User;
