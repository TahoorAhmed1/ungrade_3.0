import Image from 'next/image'
import React from 'react'
import ImagesonboardingImage from "@/Assets/Images/onboardingImage2.png"
type Props = {

}

function Step3({ }: Props) {
    return (
        <div className='Step3 flex justify-between items-center flex-wrap mt-4 h-[calc(100vh-195px)]'>
            <div className='md:w-1/2 w-full text-center md:block flex items-center justify-center flex-col'>
                <h5 className='text-blue text-2xl  font-medium leading-10 mb-4 md:hidden block text-center'>Explore Your Dashboard</h5>
                <Image
                    className='md:w-3/4   md:h-[66vh] h-[34vh] w-auto object-contain '
                    src={ImagesonboardingImage}
                    alt="Picture of the author"
                    width={500}
                    height={500}
                />
            </div>
            <div className='md:w-1/2 w-full flex items-center justify-center'>
                <div className='max-w-[455px] w-full'>
                    <h5 className='text-blue text-3xl font-medium leading-10 mb-4 md:block hidden'>Explore Your Dashboard</h5>
                    <p className='mb-4 mb-4 text-grey md:text-base text-sm md:text-lg leading-7 font-normal'>Your dashboard gives a quick glance of your progress and leads you into any action items that haven’t been completed on the platform.</p>
                    <p className=' mb-4 text-grey md:text-base text-sm md:text-lg leading-7 font-normal'>Your Check List will keep you moving through the platform and will remind you of any upcoming assessments or next steps.</p>
                </div>
            </div>
        </div>
    )
}

export default Step3