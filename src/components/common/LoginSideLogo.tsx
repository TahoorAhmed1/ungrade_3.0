'use client';
import React from 'react'
import loginGIF from "@/Assets/loginGIF.json"
import { useLottie } from "lottie-react";
type Props = {}

function LoginSideLogo({ }: Props) {
    const options = {
        animationData: loginGIF,
        loop: true
    };
    const { View } = useLottie(options);
    return (
        <div className="min-h-screen w-full bg-[#F2FAFA] text-2xl flex items-center justify-center">
            <div className='w-3/4 flex items-center justify-center'>
                {View}
            </div>

        </div>
    )
}

export default LoginSideLogo