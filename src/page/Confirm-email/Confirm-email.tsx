import ConfirmEmailForm from "@/components/forms/ConfirmEmailForm";
import React from "react";

type Props = {};

function ConfirmEmail({}: Props) {
  return (
    <div className="w-full flex flex-col justify-center items-center p-11 overflow-hidden  md:w-1/2   ">
      <h3 className="text-3xl text-center font-semibold leading-10 mb-9">
        Confirm Email
      </h3>
      <ConfirmEmailForm />
    </div>
  );
}

export default ConfirmEmail;
