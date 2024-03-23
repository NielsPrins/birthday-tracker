import { ObjectId } from 'mongodb';

export interface Birthday {
  _id?: ObjectId;
  name: string;
  day: number;
  month: number;
  birthYear?: number;
}

export interface BirthdayWithId extends Omit<Birthday, '_id'> {
  id: string;
}

export interface BirthdayWithIdAndThisYear extends BirthdayWithId {
  thisYear: boolean;
}
