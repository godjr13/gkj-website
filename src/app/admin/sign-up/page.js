import SignUpForm from "@/components/admin-signup-form";

export default async function AdminSignUpPage({ searchParams }) {
  const params = await searchParams;
  return <SignUpForm inviteToken={params?.invite || ""} />;
}
