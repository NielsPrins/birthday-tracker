import Birthday from '@/src/database/models/birthday';

export default function getDaysUntilBirthday(birthday: Birthday): number {
  const today = new Date();
  today.setUTCHours(0);
  today.setUTCMinutes(0);
  today.setUTCSeconds(0, 0);
  const nextBirthday = new Date(Date.UTC(today.getUTCFullYear(), birthday.month - 1, birthday.day));

  if (nextBirthday < today) {
    nextBirthday.setUTCFullYear(nextBirthday.getUTCFullYear() + 1);
  }

  const timeDifference = nextBirthday.getTime() - today.getTime();
  return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}
