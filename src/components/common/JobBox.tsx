import React from 'react'
import CompanyLogo from '@/Assets/Images/companyLogo.png'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { StarIcon } from '@/Assets/Icons'

type Props = {}

function JobBox({}: Props) {
  return (
    <div className='p-4 bg-white shadow-md'>
        <div className='companyName flex items-center justify-between'>
            <div className='flex items-center'>
                <Image alt='company logo' src={CompanyLogo} width={44} height={44}/>
                <p className='ml-3  text-base font-bold leading-5 text-right'>Interstate Companies</p>
            </div>
            <div className='[&>svg]:ml-2 stroke-[#F0D25D] flex items-center justify-between text-sm font-bold leading-[16.8px] text-right'>
                3.8 <StarIcon/>
            </div>
        </div>
        <div className='mt-4'>
            <h5 className='text-base font-bold leading-[19.2px] text-left mb-3'>Service Manager</h5>
            <p className='text-sm font-bold leading-[16.8px] text-left mb-5'>Sioux Falls, SD</p>
            <p className='font-lato text-sm font-normal leading-[16.8px] text-left text-black'>Interstate Power Systems is hiring a Service Manager to lead our Sioux Falls, SD Heavy-Duty Truck Service Shop. You'll manage the Service department, grow our business, and ensure customer satisfaction.</p>
        </div>
        <div className='flex items-center justify-end mt-9'>
            <button className='border-none bg-transparent outline-none font-lato text-sm font-extrabold leading-[16.8px] text-left'>Learn More</button>
        </div>
    </div>
  )
}

export default JobBox