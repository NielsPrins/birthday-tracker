import { Birthday } from '@/src/database/models/birthday';

export default function getNewAge(birthday: Birthday): number | null {
  if (!birthday.birthYear) return null;

  const today = new Date();
  const birthdayDate = new Date(Date.UTC(birthday.birthYear, birthday.month - 1, birthday.day));

  if (isNaN(birthdayDate.getTime())) {
    return null;
  }

  const newAge = today.getUTCFullYear() - birthdayDate.getUTCFullYear() + 1;

  if (
    today.getUTCMonth() < birthdayDate.getUTCMonth() ||
    (today.getUTCMonth() === birthdayDate.getUTCMonth() && today.getUTCDate() <= birthdayDate.getUTCDate())
  ) {
    return newAge - 1;
  }

  return newAge;
}
