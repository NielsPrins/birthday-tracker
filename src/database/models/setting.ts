import { ObjectId } from 'mongodb';

export interface Setting {
  _id?: ObjectId;
  key: string;
  value: string | number;
}
