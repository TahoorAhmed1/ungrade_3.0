'use client'
import SignUpForm from "@/components/forms/signUpForm";

type Props = {};

function SignUp({}: Props) {
  return (
    <div className="w-full flex flex-col justify-center items-center p-11 overflow-hidden  ">
      <h3 className="text-3xl text-center font-semibold leading-10 mb-9">
        Register
      </h3>
      <SignUpForm />
    </div>
  );
}

export default SignUp;
