'use client'
import { cn } from '@/lib/utils';
import { MoveLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
    percent?: number;
}

function AssesmentProgress({percent }: Props) {
    const router = useRouter()
    return (
        <>
        <div className='boardingProgressouter w-full h-[6px] bg-[#EAEBED] rounded-[20px]'>
            <div className={cn(`borderProgress w-[${percent}%] h-full bg-blue rounded-[20px]`)}>
            </div>
        </div>
        <div onClick={()=>router.back()} className='font-normal text-[16px] mt-4 cursor-pointer leading-[19.2px] text-left  flex items-center'>
            <MoveLeft className='text-[#009C9E] text-[20px]'/> <span className='ml-4 text-[#009C9E] text-[20px]'>Back to Dashboard</span>
        </div>
        </>
    )
}

export default AssesmentProgress