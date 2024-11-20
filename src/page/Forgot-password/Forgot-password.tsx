"use client";

import ForgotForm from "@/components/forms/forgotForm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

function ForgotPassword({ token, userId }: any) {
  const router = useRouter();
  useEffect(() => {
    if (token && userId) {
      return;
    } else {
      router.push("/confirm-email");
    }
  }, []);
  return (
    <div className="w-full flex flex-col justify-center items-center p-11 overflow-hidden  md:w-1/2 ">
      <h3 className="text-3xl text-center font-semibold leading-10 mb-9">
        Forgot password
      </h3>
      <ForgotForm token={token} />
    </div>
  );
}

export default ForgotPassword;
