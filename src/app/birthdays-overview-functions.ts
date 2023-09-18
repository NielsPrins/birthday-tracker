import Birthdate from '@/src/database/models/birthdate';

export function getNewAge(birthdate: Birthdate): number | null {
  if (!birthdate.birthYear) return null;

  const today = new Date();
  const birthDate = new Date(Date.UTC(birthdate.birthYear, birthdate.month - 1, birthdate.day));

  if (isNaN(birthDate.getTime())) {
    return null;
  }

  const newAge = today.getUTCFullYear() - birthDate.getUTCFullYear() + 1;

  if (
    today.getUTCMonth() < birthDate.getUTCMonth() ||
    (today.getUTCMonth() === birthDate.getUTCMonth() && today.getUTCDate() < birthDate.getUTCDate())
  ) {
    return newAge - 1;
  }

  return newAge;
}

export function daysUntilBirthday(birthdate: Birthdate): number {
  const today = new Date();
  const nextBirthday = new Date(today.getUTCFullYear(), birthdate.month - 1, birthdate.day);

  if (nextBirthday < today) {
    nextBirthday.setUTCFullYear(nextBirthday.getUTCFullYear() + 1);
  }

  const timeDifference = nextBirthday.getTime() - today.getTime();
  return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}
