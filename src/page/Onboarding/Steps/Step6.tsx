import Image from 'next/image'
import React from 'react'
import ImagesonboardingImage from "@/Assets/Images/onboardingImage5.png"
type Props = {

}

function Step6({ }: Props) {
    return (
        <div className='Step6 flex justify-between items-center flex-wrap mt-4 h-[calc(100vh-195px)]'>
            <div className='md:w-1/2 w-full text-center md:block flex items-center justify-center flex-col '>
                    <h5 className='text-blue text-2xl font-medium leading-10 mb-4 md:hidden block text-center'>Occupational Maps</h5>
                    <Image
                className='md:w-3/4  md:h-[66vh] h-[30vh] w-auto object-contain'
                    src={ImagesonboardingImage}
                    alt="Picture of the author"
                    width={500}
                    height={500}
                />
            </div>
            <div className='md:w-1/2 w-full flex items-center justify-center'>
                <div className='max-w-[455px] w-full'>
                    <h5 className='text-blue text-3xl font-medium leading-10 mb-4 md:block hidden'>Occupational Maps</h5>
                    <p className='mb-4  text-grey text-sm md:text-lg leading-7 font-normal'>The different competencies gained from your classes all relate to various career paths. See your top matches and receive recommendations on skills to increase your match score.</p>
                    <p className=' mb-4 text-grey text-sm md:text-lg leading-7 font-normal'>Looking at what it takes to be in different roles can help you plan a career path and see what is best suited for you.</p>
            </div>
            </div>
        </div>
    )
}

export default Step6