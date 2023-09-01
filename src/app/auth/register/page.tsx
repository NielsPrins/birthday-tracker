import styles from './page.module.css'
import { prisma } from "@/src/db";
import hashPassword from "@/src/hash-password";
import generateBase64ID from "@/src/generate-base-64-id";
import { redirect } from "next/navigation";

async function register(data: FormData) {
  "use server"

  const password = String(data.get('password')) ?? '';

  const agendaToken = generateBase64ID(20);
  const password_hash = await hashPassword(password);

  await prisma.auth.create({
    data: {
      agenda_token: agendaToken,
      password_hash: password_hash
    }
  });

  redirect('/')
}

export default async function RegisterPage() {
  return (
    <main>
      <h1>Register</h1>

      <div>
        Before we can get started, please enter a password.
      </div>

      <form action={register} className={styles.form}>
        <input type="password" placeholder="password" name="password" autoFocus/>
        <button type="submit" className="fill">Submit</button>
      </form>

    </main>
  )
}
