import Image from 'next/image'
import React from 'react'
import ImagesonboardingImage from "@/Assets/Images/onboardingImage3.png"
type Props = {

}

function Step4({ }: Props) {
    return (
        <div className='Step4 flex justify-between items-center flex-wrap mt-4 h-[calc(100vh-195px)]'>
            <div className='md:w-1/2 w-full text-center md:block flex items-center justify-center flex-col'>
                    <h5 className='text-blue text-2xl font-medium leading-10 mb-4 md:hidden block text-center'>Skills-Based Assessments</h5>
                    <Image
                className='md:w-3/4  md:h-[66vh] h-[28vh] w-auto object-contain'
                    src={ImagesonboardingImage}
                    alt="Picture of the author"
                    width={500}
                    height={500}
                />
            </div>
            <div className='md:w-1/2 w-full flex items-center justify-center'>
                <div className='max-w-[455px] w-full'>
                    <h5 className='text-blue text-3xl font-medium leading-10 mb-4 md:block hidden'>Skills-Based Assessments</h5>
                    <p className='mb-4  text-grey text-sm md:text-lg md:leading-7 leading-6 font-normal'>There are two main assessment types: Tier Assessments and Course Assessments. Tier Assessments cover the foundational skills that can apply to any job, while Course Assessments will look into the competencies gained from your classes.</p>
                    <p className=' mb-4 text-grey  text-sm md:text-lg leading-7 font-normal'>All assessments are taken at the beginning and end of the semester to measure your learning before and after you’ve taken a course.</p>
            </div>
            </div>
        </div>
    )
}

export default Step4