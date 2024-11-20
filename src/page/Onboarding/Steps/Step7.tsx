import Image from 'next/image'
import React from 'react'
import ImagesonboardingImage from "@/Assets/Images/onboardingImage6.png"
type Props = {

}

function Step7({ }: Props) {
    return (
        <div className='Step7 flex justify-between items-center flex-wrap mt-4 h-[calc(100vh-195px)]'>
            <div className='md:w-1/2 w-full text-center md:block flex items-center justify-center flex-col'>
                    <h5 className='text-blue text-2xl font-medium leading-10 mb-4 md:hidden block text-center'>Plan Your Future Courses</h5>
                    <Image
                    className='md:w-3/4  md:h-[66vh] h-[34vh] w-auto object-contain'
                    src={ImagesonboardingImage}
                    alt="Picture of the author"
                    width={500}
                    height={500}
                />
            </div>
            <div className='md:w-1/2 w-full flex items-center justify-center'>
                <div className='max-w-[455px] w-full'>
                    <h5 className='text-blue text-3xl font-medium leading-10 mb-4 md:block hidden'>Plan Your Future Courses</h5>
                    <p className='mb-4  text-grey text-sm md:text-lg leading-7 font-normal'>By identifying skills gaps, you’ll be able to more efficiently plan out your courses based on the skills you hope to gain.</p>
                    <p className=' mb-4 text-grey text-sm md:text-lg  leading-7 font-normal'>Take a look at the skills gained across courses taught by different professors and compare previous students’ progress after completing the course.</p>
                </div>
            </div>
        </div>
    )
}

export default Step7