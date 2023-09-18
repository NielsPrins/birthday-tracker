import { ObjectId } from 'mongodb';

export default interface Birthdate {
  _id?: ObjectId;
  name: string;
  day: number;
  month: number;
  birthYear?: number;
}

export interface BirthdateWithId extends Omit<Birthdate, '_id'> {
  id: string;
}
