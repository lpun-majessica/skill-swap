import AuthGuard from "@/components/auth/auth-guard";
import OnboardingForm from "@/components/new-user/onboarding-form";

export default function OnboardingPage() {
  return (
    <AuthGuard>
      <OnboardingForm />
    </AuthGuard>
  );
}
