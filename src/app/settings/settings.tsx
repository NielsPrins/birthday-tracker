'use client';

type Props = {
  calendarUrl: string;
};

export default function Settings(props: Props) {
  return (
    <>
      <h1>Settings</h1>
      <div>
        See your birthdays in your agenda app by using this URL:
        <div>{props.calendarUrl}</div>
      </div>
      <hr />
    </>
  );
}
