import Birthday from '@/src/database/models/birthday';

export function getNewAge(birthday: Birthday): number | null {
  if (!birthday.birthYear) return null;

  const today = new Date();
  const birthdayDate = new Date(Date.UTC(birthday.birthYear, birthday.month - 1, birthday.day));

  if (isNaN(birthdayDate.getTime())) {
    return null;
  }

  const newAge = today.getUTCFullYear() - birthdayDate.getUTCFullYear() + 1;

  if (
    today.getUTCMonth() < birthdayDate.getUTCMonth() ||
    (today.getUTCMonth() === birthdayDate.getUTCMonth() && today.getUTCDate() < birthdayDate.getUTCDate())
  ) {
    return newAge - 1;
  }

  return newAge;
}

export function daysUntilBirthday(birthday: Birthday): number {
  const today = new Date();
  const nextBirthday = new Date(today.getUTCFullYear(), birthday.month - 1, birthday.day);

  if (nextBirthday < today) {
    nextBirthday.setUTCFullYear(nextBirthday.getUTCFullYear() + 1);
  }

  const timeDifference = nextBirthday.getTime() - today.getTime();
  return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}
