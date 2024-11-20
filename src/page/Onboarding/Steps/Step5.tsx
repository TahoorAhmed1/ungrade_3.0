import Image from 'next/image'
import React from 'react'
import ImagesonboardingImage from "@/Assets/Images/onboardingImage4.png"
type Props = {

}

function Step5({ }: Props) {
    return (
        <div className='Step5 flex justify-between items-center flex-wrap mt-4 h-[calc(100vh-195px)]'>
            <div className='w-1/2 text-center md:block flex items-center justify-center flex-col'>
                <h5 className='text-blue text-2xl font-medium leading-10 mb-4 md:hidden block text-center'>Your Assessment Results</h5>
                <Image
                    className='md:w-3/4  md:h-[66vh] h-[25vh] w-auto object-contain  '
                    src={ImagesonboardingImage}
                    alt="Picture of the author"
                    width={300}
                    height={300}
                />
            </div>
            <div className='md:w-1/2 w-full flex items-center justify-center'>
                <div className='max-w-[455px] w-full'>
                    <h5 className='text-blue text-3xl font-medium leading-10 mb-4 md:block hidden'>Your Assessment Results</h5>
                    <p className='mb-4 mb-4 text-grey md:text-base  text-sm md:text-lg leading-7 font-normal'>While the dashboard has a quick view of the competencies you’ve gained from taking classes after you’ve completed a course assessment, you’ll find a comprehensive view of your results in the Evaluation Center.</p>
                    <p className=' mb-4 text-grey md:text-base text-sm md:text-lg leading-7 font-normal'>Some of the ways you can compare your results could include students in your class or students in the same class taught by a different professor.</p>
                </div>
            </div>
        </div>
    )
}

export default Step5