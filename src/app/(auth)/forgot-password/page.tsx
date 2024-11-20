import ForgotPassword from "@/page/Forgot-password/Forgot-password";

type Props = {};

function page({ searchParams }: any) {
  return (
    <ForgotPassword token={searchParams?.token} userId={searchParams?.token} />
  );
}

export default page;
