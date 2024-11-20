import Image from 'next/image'
import React from 'react'
import ImagesonboardingImage from "@/Assets/Images/onboardingImage.png"
type Props = {

}

function Step2({ }: Props) {
    return (
        <div className='Step2 flex justify-between items-center flex-wrap mt-4 h-[calc(100vh-195px)]'>
            <div className='md:w-1/2 w-full text-center md:block flex items-center justify-center flex-col '>
                <h5 className='text-blue text-2xl font-medium leading-10 mb-4 md:hidden block text-center'>You’ve Taken the First Step</h5>
                <Image
                    className='md:w-3/4 md:h-[66vh] h-[30vh] w-auto object-contain'
                    src={ImagesonboardingImage}
                    alt="Picture of the author"
                    width={500}
                    height={500}
                />
            </div>
            <div className='md:w-1/2 w-full flex items-center justify-center'>
                <div className='max-w-[455px] w-full'>
                    <h5 className='text-blue text-3xl font-medium leading-10 mb-4 md:block hidden'>You’ve Taken the First Step</h5>
                    <p className='mb-4 text-grey md:text-base md:text-lg text-sm leading-7 font-normal'>Each course you take during your academic journey will prepare you with different skills that will later be applied to your career.</p>
                    <p className=' mb-4 text-grey md:text-base md:text-lg text-sm leading-7 font-normal'>With Ungrade, you’ll be equipped with a personalized learning experience that will help guide you toward a career path that is right for you.</p>
                </div>
            </div>
        </div>
    )
}

export default Step2