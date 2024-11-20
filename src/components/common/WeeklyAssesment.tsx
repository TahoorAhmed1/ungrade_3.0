import React, { ReactNode, useState } from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '../ui/carousel'
import AssesmentProgress from './AssesmentProgress'
import { BookOpen, Boxes, Presentation, Shield, User, Users } from 'lucide-react'
import { Ladder, SignPost } from '@/Assets/Icons'
import AssesmentLayout from './AssesmentLayout'
import ChooseAnswer from './ChooseAnswer'
import RangeSelector from './RangeSelector'
import { useRouter } from 'next/navigation'

type SkillBoxProp = {
    icon: ReactNode;
    name: string;
}

const SkillBox = ({ icon, name }: SkillBoxProp) => {
    return (
        <div className='TopSkillProgress relative flex justify-start items-end bg-[rgba(229,245,245,1)] p-6 rounded-radius shadow-[0px_2px_4px_-2px_rgba(16,24,40,0.06)]'>
            <div className='flex items-center '>
                <div className='rounded-full w-10 h-10 mr-4 bg-[#B3E1E2] text-blueDark flex items-center justify-center'>
                    {icon}
                </div>
                <div className=''>
                    <p className='font-normal text-xl leading-[28.8px] text-left text-blueDark'>{name}</p>
                </div>
            </div>
        </div>
    )
}

type Props = {}

function WeeklyAssesment({ }: Props) {
  const router = useRouter();

    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)
    const [assesmentData, setAssesmentData] = useState([
        {
            "question": 'How are you feeling about your classes this week?',
            "subText": '',
            "suggested": '',
            "type": 'checkbox',
            "answerOptions": [
                {
                    "name": 'Fantastic- I’m in the zone.',
                },
                {
                    "name": 'Very well- I’m enjoying my classes.',
                },
                {
                    "name": 'Just ok- There are some challenges.',
                },
                {
                    "name": 'Not great- Feeling discouraged.',
                },
            ],
            "answer": ''
        },
        {
            "question": 'How are you feeling about your classes this week?',
            "subText": '',
            "suggested": '',
            "type": 'checkbox',
            "answerOptions": [
                {
                    "name": 'Fantastic- I’m in the zone.',
                },
                {
                    "name": 'Very well- I’m enjoying my classes.',
                },
                {
                    "name": 'Just ok- There are some challenges.',
                },
                {
                    "name": 'Not great- Feeling discouraged.',
                },
            ],
            "answer": ''
        },
        {
            "question": 'How well did you understand course concepts this week?',
            "subText": 'Use the sliding scale below to select your rating.',
            "suggested": '1: Very Inaccurate | 2: Moderately Inaccurate | 3: Neutral | 4: Moderately Accurate | 5: Accurate',
            "type": 'range',
            "answerOptions": [
                {
                    "name": ''
                },
            ],
            "answer": ''
        },
        {
            "question": 'What steps did you take to improve this week?',
            "subText": 'Select all that apply.',
            "suggested": '',
            "type": 'checkbox',
            "answerOptions": [
                {
                    "name": 'Attended course office hours',
                },
                {
                    "name": 'Completed all ',
                },
                {
                    "name": 'Studied with a classmate',
                },
                {
                    "name": 'Asked someone for help',
                },
                {
                    "name": 'Improved time management',
                },
                {
                    "name": 'Prioritized mental health',
                },
                {
                    "name": 'Made an organized plan',
                },
                {
                    "name": 'Other',
                },
            ],
            "answer": ''
        }
    ])
    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)
        console.log(api.selectedScrollSnap())

        api.on("select", () => {
            console.log(api.selectedScrollSnap())
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])
    return (
        <>
            <AssesmentProgress percent={50} />
            <div className='Assesment'>
                <Carousel setApi={setApi} draggable={false}>
                    <CarouselContent>
                        {assesmentData?.map((a, i) => {
                            return (
                                <CarouselItem>
                                    <AssesmentLayout
                                        totalQuestions={assesmentData?.length}
                                        activeQuestion={current}
                                        question={a?.question}
                                        subtext={a?.subText}
                                        suggestions={a?.suggested}
                                    >
                                        {a?.type === 'checkbox' ?
                                            <ChooseAnswer answerOptions={a?.answerOptions} />
                                            : a?.type === 'range' ?
                                                // <RangeSelector /> 
                                                ""
                                                : null
                                        }
                                    </AssesmentLayout>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                </Carousel>
                <div className='w-full items-center flex justify-center '>
                    <button className='max-w-[200px] w-full py-2 rounded-radius bg-blueDark disabled:bg-[#EAEBED] text-white disabled:text-black text-center' onClick={() => {
                        // setNextActive(false)
                        // console.log(current, 'current')
                        api?.scrollNext()
                    }}>Next</button>
                    <button className='max-w-[200px] w-full py-2 rounded-radius bg-transparent border-blueDark border-solid border-[1px] ml-6 disabled:bg-[#EAEBED] text-black disabled:text-black text-center'  onClick={() => {
            router.push("/dashboard");
          }}>Save for Later</button>
                </div>
            </div>
        </>
    )
}

export default WeeklyAssesment