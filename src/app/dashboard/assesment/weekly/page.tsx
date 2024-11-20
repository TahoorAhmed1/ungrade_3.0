"use client"
import WeeklyAssesment from '@/components/common/WeeklyAssesment'
import React from 'react'

type Props = {}

function page({ }: Props) {
    return (
        <div className='w-full p-6'>
            <WeeklyAssesment />
        </div>
    )
}

export default page