import { createEvents, EventAttributes } from 'ics';
import { NextRequest, NextResponse } from 'next/server';
import getMongoCollection from '@/src/db';
import Setting from '@/src/database/models/setting';
import { getBirthdays } from '@/src/app/get-birthdays';
import { getNewAge } from '@/src/app/birthdays-overview-functions';
import moment from 'moment';

const defaultEvent = {
  productId: 'birthday-tracker',
  calName: 'Birthdays',
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url ?? '');
  const calendarToken = url.searchParams.get('token');

  const settingsCollection = await getMongoCollection('settings');
  const calendarApiTokenSetting = await settingsCollection.findOne<Setting>({ key: 'calendarApiToken' });
  if (!calendarApiTokenSetting || calendarToken !== calendarApiTokenSetting.value) {
    return NextResponse.error();
  }

  const now = new Date();
  const birthdays = await getBirthdays();
  const birthdayEvents = birthdays.map((birthday): EventAttributes => {
    const newAge = getNewAge(birthday);

    const today = new Date();
    today.setUTCHours(0);
    today.setUTCMinutes(0);
    today.setUTCSeconds(0, 0);
    const nextBirthday = new Date(Date.UTC(today.getUTCFullYear(), birthday.month - 1, birthday.day));

    if (nextBirthday < today) {
      nextBirthday.setUTCFullYear(nextBirthday.getUTCFullYear() + 1);
    }

    return {
      ...defaultEvent,
      uid: birthday.id,
      start: [nextBirthday.getUTCFullYear(), nextBirthday.getUTCMonth(), nextBirthday.getUTCDay()],
      end: [nextBirthday.getUTCFullYear(), nextBirthday.getUTCMonth(), nextBirthday.getUTCDay() + 1],
      title: `${birthday.name}${newAge ? ` (${newAge})` : ''}`,
      description: `Last sync on: ${moment(now).format('DD MMMM YYYY HH:mm')}`,
    };
  });

  const ics = await new Promise<string>((resolve) => {
    createEvents(birthdayEvents, (error, value) => {
      if (error) {
        console.error(error);
        return NextResponse.error();
      }

      resolve(value);
    });
  });

  const res = new NextResponse(ics);
  res.headers.set('Content-Type', 'text/calendar; charset=utf-8');
  res.headers.set('Content-Disposition', 'attachment; filename=calendar.ics');
  return res;
}
