import { prisma } from "@/src/db";
import { redirect } from "next/navigation";
import Form from "@/src/app/auth/login/form";

export default async function RegisterPage() {
  const authRecord = await prisma.auth.findFirst();
  if (!authRecord) {
    redirect('/auth/register')
  }

  return (
    <main>
      <h1>Login</h1>

      <Form></Form>
    </main>
  )
}
