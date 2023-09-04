import { prisma } from "@/src/db";
import { redirect } from "next/navigation";
import Form from "@/src/app/auth/register/form";

export default async function RegisterPage() {
  const authRecord = await prisma.auth.findFirst();
  if (authRecord) {
    redirect('/auth/login')
  }

  return (
    <main>
      <h1>Register</h1>

      <div>
        Before we can get started, please enter a password.
      </div>

      <Form></Form>

    </main>
  )
}
