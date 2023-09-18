import { ObjectId } from 'mongodb';

export default interface Setting {
  _id?: ObjectId;
  key: string;
  value: string | number;
}
