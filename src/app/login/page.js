import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center min-h-screen p-24">
      <div>
        <h1 className="text-4xl font-bold mb-4">Welcome to SkillSwap!</h1>
        <p className="mb-8">A platform for skill exchange.</p>
      </div>
      <LoginForm />
    </main>
  );
}
