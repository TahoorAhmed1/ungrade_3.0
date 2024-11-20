import LoginForm from "@/components/forms/loginForm";

type Props = {};

function Login({}: Props) {
  return (
    <div className="w-full flex flex-col justify-center items-center p-11 overflow-hidden  md:w-1/2">
      <h3 className="text-3xl text-center font-semibold leading-10 mb-9">
        Login
      </h3>
      <LoginForm />
    </div>
  );
}

export default Login;
