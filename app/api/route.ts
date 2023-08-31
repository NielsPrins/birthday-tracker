import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { Birthday } from "@/lib/interfaces/birthday";

async function openDb() {
  return open({
    filename: 'database.db',
    driver: sqlite3.Database
  })
}

export async function GET(request: Request) {
  const db = await openDb();
  const result = await db.all<Birthday[]>('SELECT * FROM birthdays')

  return new Response(JSON.stringify(result), {
    status: 200,
  })
}
