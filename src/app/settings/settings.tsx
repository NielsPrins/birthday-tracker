'use client';

import { useEffect, useState } from 'react';

type Props = {
  calendarApiToken: string;
};

export default function Settings(props: Props) {
  const [calendarUrl, setCalendarUrl] = useState<string | null>(null);

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const calendarUrl = new URL(currentUrl.origin);
    calendarUrl.pathname = 'calendar';
    calendarUrl.searchParams.set('token', props.calendarApiToken);
    setCalendarUrl(String(calendarUrl));
  }, [props.calendarApiToken]);

  return <>{calendarUrl}</>;
}
